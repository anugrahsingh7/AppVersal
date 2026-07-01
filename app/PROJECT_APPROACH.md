# Project Approach & Interview Guide

This document explains how the Survey Campaign Builder was designed and implemented. Use it to walk interviewers through your decisions confidently.

---

## 1. Problem Understanding

The assignment asks for a **Survey Campaign Builder** with three connected parts:

1. **Content** — what the survey says (questions, options, thank you page)
2. **Styling** — how the survey looks (colors, fonts, spacing, layouts)
3. **Live Mobile Preview** — a phone-style preview that updates instantly

The key constraint is **real-time sync**: every edit in Content or Styling must reflect in the preview without save or refresh.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     SurveyProvider                       │
│              (React Context — single source of truth)    │
└─────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
┌─────────────────┐           ┌─────────────────────┐
│  Builder Panel   │           │   Mobile Preview     │
│  Content / Style │  live     │   QuestionScreen     │
│  tabs + forms    │  sync ──► │   ThankYouScreen     │
└─────────────────┘           └─────────────────────┘
```

**Why Context instead of Redux or Zustand?**

- The app has one cohesive state tree (content + styling + preview UI)
- No server persistence is required
- Context keeps the solution simple and easy to explain in an interview
- If the product grows, the context can be split or migrated to Zustand later

---

## 3. State Design

State is grouped into four logical areas:

| Area | Purpose |
|------|---------|
| `questions[]` | Dynamic list of survey questions with options and logic |
| `thankYou` | Optional closing screen config and media |
| `styling` | All visual customization grouped by UI element |
| Preview UI | `previewQuestionIndex`, `previewSelections`, `previewComment` |

### Dynamic questions

When the user changes **Number of Survey Pages**:

- If count increases → new default questions are appended
- If count decreases → extra questions are removed
- Preview index is clamped so it never points to a removed question

Each question and option gets a stable `id` so list edits do not break conditional logic references.

---

## 4. Folder Structure Rationale

```
components/
  ui/           → dumb, reusable inputs (TextInput, Toggle, ColorInput)
  builder/      → feature forms split by tab (content / styling)
  preview/      → read-only rendering of survey screens
  layout/       → app shell (header, two-column layout)
constants/      → defaults and enums (fonts, layouts, redirect options)
context/        → state + actions
utils/          → pure helpers (convert config objects to inline CSS)
```

This separation makes it easy for another developer to:

- Add a new styling section without touching preview code
- Reuse form controls across tabs
- Test style helpers independently

---

## 5. Content Tab Implementation

### Introduction

- Number input controls `pageCount` (clamped 1–10)
- `setPageCount` synchronizes the `questions` array length

### Question pages

Each question supports:

- Title and subtitle (text inputs)
- Dynamic options (minimum 2, unlimited add, delete when > 2)
- Additional comments toggle
- Submit button label
- **Conditional logic (mock)** — maps an option to a redirect target:
  - Next question
  - Specific question
  - Thank you page

Logic is evaluated in `goToNextPreviewScreen()` when the user taps the CTA in preview.

### Thank you page

- Toggle to enable/disable
- Media upload via `URL.createObjectURL`
- Supports images (PNG/JPG/GIF) and Lottie JSON
- CTA text + redirect type (URL, close, restart)

---

## 6. Styling Tab Implementation

Styling controls are grouped in **collapsible sections** (`<details>`) to avoid overwhelming the user with one long form.

Repeated patterns are extracted:

- `TextStyleControls` — color, font, size, weight, bold/italic/underline, alignment
- `OptionStyleControls` — border, text, background, typography
- `ButtonStyleControls` — colors, dimensions, full-width toggle
- `MarginControls` / `CornerRadiusControls` — four-value inputs

Each section calls `updateStyling(path, value)` which immutably updates nested styling state.

---

## 7. Live Preview Implementation

### Layout

- Phone frame with notch bar and rounded corners
- Backdrop color + opacity behind the device
- Display delay simulates a timed popup (uses `setTimeout` + opacity transition)

### Rendering pipeline

1. Read content + styling from context
2. Convert styling config → inline CSS via helpers in `styleHelpers.js`
3. Render either `QuestionScreen` or `ThankYouScreen`

### Option layouts

Four layouts from the spec:

| Layout | Behavior |
|--------|----------|
| Radio | Circle indicator + label |
| Checkbox | Square indicator with checkmark |
| Filled | Full-width filled selection state |
| Alternative | Stacked/centered card style |

Selected vs unselected styles are applied separately so users can customize both states.

### Cross button

- Can be enabled/disabled
- Predefined styles: circle, square, minimal, rounded
- Optional custom icon upload
- Color, fill, stroke, size, and margin controls

---

## 8. Real-Time Updates

There is **no save button**. Updates work because:

1. All form inputs call context actions directly
2. Context state change triggers re-render of both builder and preview
3. Preview reads from the same state object

This is the simplest correct approach for a local-only builder.

---

## 9. Responsive Design

- **Desktop (xl+)**: two columns — builder left, sticky preview right
- **Tablet/mobile**: stacked layout; preview remains visible below the builder
- Content sidebar nav scrolls horizontally on small screens
- Form grids use `sm:` breakpoints for 2–4 column layouts

---

## 10. Libraries & Trade-offs

| Choice | Reason |
|--------|--------|
| Tailwind CSS v4 | Already configured; fast UI iteration |
| lottie-react | Proper Lottie JSON rendering on thank you page |
| No form library | Assignment forms are manageable; avoids extra abstraction |
| Inline styles in preview | Styling is user-driven and dynamic — CSS variables would also work, but inline styles map directly from config |

---

## 11. Possible Interview Questions & Answers

**Q: Why did you use Context?**  
A: Single app-wide state, no persistence, moderate complexity. Context is enough and keeps the codebase approachable.

**Q: How would you persist campaigns?**  
A: Serialize context state to JSON, save to backend or localStorage, hydrate on load. The state shape is already serializable.

**Q: How would you scale this for 50+ styling fields?**  
A: Split context by domain (`ContentContext`, `StylingContext`), or use Zustand slices. Keep preview as a consumer of combined selectors.

**Q: Is conditional logic production-ready?**  
A: No — it's intentionally mocked per the assignment. Production would need a rules engine, validation, and cycle detection for redirects.

**Q: How do you prevent invalid option deletion?**  
A: `removeOption` checks `options.length <= 2` and no-ops. Delete button is also disabled in UI.

**Q: How does media upload work?**  
A: File input → `URL.createObjectURL` for instant preview. Production would upload to cloud storage and store a permanent URL.

**Q: What would you improve with more time?**  
A: Undo/redo, drag-and-drop option reorder, form validation messages, accessibility audit, unit tests for reducers/helpers, and deployment CI.

---

## 12. Deployment Checklist

1. Push to GitHub
2. Deploy on Vercel (`npm run build`, output `dist`)
3. Add live URL to README
4. Submit repo link + demo URL + README as required

---

## 13. Demo Flow for Interview

1. Set question count to 3 → show dynamic question sections appear
2. Edit question title → preview updates instantly
3. Add/remove options → preview list changes
4. Enable comments → textarea appears in preview
5. Add a condition → select option in preview, submit, show redirect
6. Enable thank you page → upload image, customize styling
7. Switch to Styling tab → change colors/fonts → preview reflects immediately
8. Toggle cross button styles and CTA full width

This demo covers the assignment's core evaluation points: React fundamentals, component architecture, state management, dynamic forms, reusable components, and UI implementation.

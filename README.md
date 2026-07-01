# Survey Campaign Builder

A simplified Survey Campaign Builder built for the AppVersal Frontend Intern Assignment. Configure survey content and styling from a split-panel builder while watching a live mobile preview update instantly.

## Live Demo

Deploy this project to Vercel, Netlify, or Render and add your URL here:

`https://your-deployment-url.vercel.app`

## Tech Stack

- **React 19** with Vite
- **JavaScript**
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **lottie-react** for Lottie animation previews
- **React Context** for shared builder state

## Features

- **Content tab**
  - Introduction page with dynamic question count (1–10)
  - Per-question title, subtitle, options (add/remove), comments toggle
  - Mock conditional logic (redirect by selected option)
  - Optional thank you page with media upload, CTA, and redirect settings
- **Styling tab**
  - Appearance, typography, option layouts, button styles, cross button, and thank you styling
- **Live mobile preview**
  - Real-time sync with all content and styling changes
  - Question navigation, option selection, comments, submit flow, and thank you screen

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <your-repo-url>
cd myapp
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`



## Folder Structure

```
src/
├── components/
│   ├── builder/
│   │   ├── content/          # Content tab sections
│   │   └── styling/          # Styling tab sections
│   ├── layout/               # App shell and page layout
│   ├── preview/              # Live mobile preview UI
│   └── ui/                   # Reusable form controls
├── constants/
│   └── defaults.js           # Initial state and shared constants
├── context/
│   └── SurveyContext.jsx     # Global builder state
├── utils/
│   └── styleHelpers.js       # Style object builders for preview
├── App.jsx
├── main.jsx
└── index.css
```

## Assignment Notes

This project follows the AppVersal assignment spec:

- Content, Styling, and Live Mobile Preview sections
- Dynamic questions and options
- Conditional logic mock
- Thank you page with media support (PNG, JPG, JPEG, GIF, Lottie JSON)
- Comprehensive styling controls
- No save button required — preview updates live



## Scripts

| Command         | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint               |

## Author

Built as part of the AppVersal React Developer assignment submission.

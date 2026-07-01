export const FONT_FAMILIES = [
  { value: "'Plus Jakarta Sans', system-ui, sans-serif", label: 'Plus Jakarta Sans' },
  { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: "'Times New Roman', serif", label: 'Times New Roman' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: "'Courier New', monospace", label: 'Courier New' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
]

export const FONT_WEIGHTS = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
]

export const CROSS_BUTTON_STYLES = [
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'rounded', label: 'Rounded Square' },
]

export const REDIRECT_OPTIONS = [
  { value: 'url', label: 'URL' },
  { value: 'close', label: 'Close Survey' },
  { value: 'restart', label: 'Restart Survey' },
]

export const OPTION_LAYOUTS = [
  { value: 'radio', label: 'Radio Style' },
  { value: 'checkbox', label: 'Checkbox Style' },
  { value: 'filled', label: 'Filled Option' },
  { value: 'alternative', label: 'Alternative Layout' },
]

export const ACCEPTED_MEDIA_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'application/json',
]

let idCounter = 0

export function createId(prefix = 'item') {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

export function createDefaultMargins() {
  return { top: 0, bottom: 0, left: 0, right: 0 }
}

export function createDefaultCornerRadius(value = 8) {
  return { topLeft: value, topRight: value, bottomLeft: value, bottomRight: value }
}

export function createDefaultTextStyle(overrides = {}) {
  return {
    color: '#111827',
    fontFamily: FONT_FAMILIES[0].value,
    fontSize: 16,
    fontWeight: '600',
    bold: false,
    italic: false,
    underline: false,
    alignment: 'left',
    margin: createDefaultMargins(),
    ...overrides,
  }
}

export function createDefaultOptionStyle(overrides = {}) {
  return {
    borderColor: '#d1d5db',
    textColor: '#374151',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    fontFamily: FONT_FAMILIES[0].value,
    fontSize: 14,
    fontWeight: '400',
    bold: false,
    italic: false,
    underline: false,
    alignment: 'left',
    ...overrides,
  }
}

export function createDefaultButtonStyle(overrides = {}) {
  return {
    fullWidth: true,
    borderColor: '#0d9488',
    textColor: '#ffffff',
    backgroundColor: '#0d9488',
    fontFamily: FONT_FAMILIES[0].value,
    fontSize: 15,
    bold: false,
    italic: false,
    underline: false,
    height: 44,
    width: 100,
    borderWidth: 0,
    cornerRadius: createDefaultCornerRadius(8),
    alignment: 'center',
    margin: createDefaultMargins(),
    ...overrides,
  }
}

export function createDefaultQuestion(index = 1) {
  const samples = [
    {
      title: 'How satisfied are you with our product?',
      subtitle: 'Your feedback helps us improve what we ship next.',
      options: ['Very satisfied', 'Satisfied', 'Neutral', 'Needs improvement'],
      submitButtonText: 'Continue',
    },
    {
      title: 'What could we do better?',
      subtitle: 'Pick the area that matters most to you.',
      options: ['Performance', 'Design', 'Support', 'Pricing'],
      submitButtonText: 'Next',
    },
  ]

  const sample = samples[(index - 1) % samples.length]

  return {
    id: createId('question'),
    title: sample.title,
    subtitle: sample.subtitle,
    options: sample.options.map((text) => ({ id: createId('option'), text })),
    allowComments: false,
    conditions: [],
    submitButtonText: sample.submitButtonText,
  }
}

export function createInitialState() {
  return {
    activeTab: 'content',
    activeContentSection: 'introduction',
    activeQuestionId: null,
    previewQuestionIndex: 0,
    previewSelections: {},
    previewComment: '',
    pageCount: 1,
    questions: [createDefaultQuestion(1)],
    thankYou: {
      enabled: false,
      mediaUrl: null,
      mediaType: null,
      mediaName: '',
      title: 'Thanks — we got it',
      subtitle: 'Your response has been recorded. We read every submission.',
      buttonText: 'Close',
      redirectTo: 'url',
      redirectUrl: '',
    },
    styling: {
      appearance: {
        backgroundColor: '#ffffff',
        cornerRadius: createDefaultCornerRadius(20),
        delay: 0,
        backdropColor: '#0f172a',
        backdropOpacity: 45,
      },
      questionTitle: createDefaultTextStyle({
        fontSize: 20,
        fontWeight: '700',
        margin: { top: 0, bottom: 8, left: 0, right: 0 },
      }),
      subtitle: createDefaultTextStyle({
        fontSize: 14,
        fontWeight: '400',
        color: '#6b7280',
        margin: { top: 0, bottom: 20, left: 0, right: 0 },
      }),
      optionList: {
        layout: 'radio',
        height: 48,
        bulletSpacing: 10,
        optionSpacing: 10,
        cornerRadius: createDefaultCornerRadius(10),
      },
      selectedOption: createDefaultOptionStyle({
        borderColor: '#0d9488',
        textColor: '#0f766e',
        backgroundColor: '#f0fdfa',
        borderWidth: 2,
      }),
      unselectedOption: createDefaultOptionStyle(),
      additionalComment: {
        borderColor: '#d1d5db',
        textColor: '#111827',
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        fontFamily: FONT_FAMILIES[0].value,
        fontSize: 14,
        fontWeight: '400',
        bold: false,
        italic: false,
        underline: false,
        alignment: 'left',
      },
      ctaButton: createDefaultButtonStyle(),
      crossButton: {
        enabled: true,
        style: 'circle',
        customIconUrl: null,
        color: '#64748b',
        fillColor: '#f8fafc',
        strokeColor: '#64748b',
        size: 28,
        margin: { top: 12, bottom: 0, left: 0, right: 12 },
      },
      thankYouTitle: createDefaultTextStyle({
        fontSize: 22,
        fontWeight: '700',
        alignment: 'center',
        margin: { top: 0, bottom: 8, left: 0, right: 0 },
      }),
      thankYouSubtitle: createDefaultTextStyle({
        fontSize: 14,
        fontWeight: '400',
        color: '#6b7280',
        alignment: 'center',
        margin: { top: 0, bottom: 16, left: 0, right: 0 },
      }),
      thankYouImage: {
        width: 140,
        height: 140,
        margin: { top: 0, bottom: 16, left: 0, right: 0 },
      },
      thankYouButton: createDefaultButtonStyle({
        fullWidth: false,
        width: 160,
      }),
    },
  }
}

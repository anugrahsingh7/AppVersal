import { buildMarginStyle } from '../../utils/styleHelpers'

const styleClasses = {
  circle: 'rounded-full',
  square: 'rounded-none',
  minimal: 'rounded-md bg-transparent',
  rounded: 'rounded-xl',
}

export default function CrossButton({ config, onClick }) {
  if (!config.enabled) return null

  const marginStyle = buildMarginStyle(config.margin)

  if (config.customIconUrl) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Close survey"
        style={{
          ...marginStyle,
          width: config.size,
          height: config.size,
        }}
        className="ml-auto shrink-0"
      >
        <img
          src={config.customIconUrl}
          alt=""
          className="h-full w-full object-contain"
        />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close survey"
      style={{
        ...marginStyle,
        width: config.size,
        height: config.size,
        color: config.color,
        backgroundColor: config.style === 'minimal' ? 'transparent' : config.fillColor,
        border: config.style === 'minimal' ? 'none' : `1px solid ${config.strokeColor}`,
      }}
      className={`ml-auto flex shrink-0 items-center justify-center transition hover:opacity-80 ${styleClasses[config.style] ?? styleClasses.circle}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-1/2 w-1/2"
      >
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      </svg>
    </button>
  )
}

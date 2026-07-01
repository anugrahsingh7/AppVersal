import { buildCornerRadius, buildOptionStyle } from '../../utils/styleHelpers'

function OptionIndicator({ layout, selected }) {
  if (layout === 'checkbox') {
    return (
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
          selected ? 'border-current bg-current' : 'border-current bg-transparent'
        }`}
      >
        {selected && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="currentColor">
            <path d="M4.5 8.2 2.3 6l-.8.8 3 3 6-6-.8-.8z" />
          </svg>
        )}
      </span>
    )
  }

  if (layout === 'radio') {
    return (
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          selected ? 'border-current' : 'border-current'
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-current" />}
      </span>
    )
  }

  return null
}

export default function OptionItem({
  option,
  layout,
  selected,
  height,
  spacing,
  cornerRadius,
  selectedStyle,
  unselectedStyle,
  onSelect,
}) {
  const styleConfig = selected ? selectedStyle : unselectedStyle
  const optionStyle = buildOptionStyle(styleConfig)
  const radiusStyle = buildCornerRadius(cornerRadius)

  const isFilled = layout === 'filled'
  const isAlternative = layout === 'alternative'

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      style={{
        ...optionStyle,
        ...radiusStyle,
        minHeight: `${height}px`,
        paddingLeft: `${spacing}px`,
        paddingRight: `${spacing}px`,
        display: 'flex',
        alignItems: 'center',
        gap: `${spacing}px`,
        width: '100%',
        transition: 'all 0.15s ease',
        ...(isAlternative
          ? {
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }
          : {}),
        ...(isFilled && selected
          ? {
              boxShadow: 'inset 0 0 0 1px currentColor',
            }
          : {}),
      }}
    >
      {!isFilled && !isAlternative && (
        <OptionIndicator layout={layout} selected={selected} />
      )}
      <span className="flex-1">{option.text}</span>
    </button>
  )
}

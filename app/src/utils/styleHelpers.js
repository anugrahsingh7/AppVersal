export function buildTextStyle(style) {
  const decorations = []
  if (style.bold) decorations.push('bold')
  if (style.italic) decorations.push('italic')
  if (style.underline) decorations.push('underline')

  return {
    color: style.color,
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.bold ? '700' : style.fontWeight,
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: style.underline ? 'underline' : 'none',
    textAlign: style.alignment,
    marginTop: `${style.margin?.top ?? 0}px`,
    marginBottom: `${style.margin?.bottom ?? 0}px`,
    marginLeft: `${style.margin?.left ?? 0}px`,
    marginRight: `${style.margin?.right ?? 0}px`,
  }
}

export function buildOptionStyle(style) {
  const decorations = []
  if (style.bold) decorations.push('bold')
  if (style.italic) decorations.push('italic')
  if (style.underline) decorations.push('underline')

  return {
    color: style.textColor,
    backgroundColor: style.backgroundColor,
    borderColor: style.borderColor,
    borderWidth: `${style.borderWidth}px`,
    borderStyle: 'solid',
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.bold ? '700' : style.fontWeight,
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: style.underline ? 'underline' : 'none',
    textAlign: style.alignment,
  }
}

export function buildButtonStyle(style) {
  const width = style.fullWidth ? '100%' : `${style.width}px`

  return {
    color: style.textColor,
    backgroundColor: style.backgroundColor,
    borderColor: style.borderColor,
    borderWidth: `${style.borderWidth}px`,
    borderStyle: 'solid',
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.bold ? '700' : '400',
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: style.underline ? 'underline' : 'none',
    height: `${style.height}px`,
    width,
    borderTopLeftRadius: `${style.cornerRadius.topLeft}px`,
    borderTopRightRadius: `${style.cornerRadius.topRight}px`,
    borderBottomLeftRadius: `${style.cornerRadius.bottomLeft}px`,
    borderBottomRightRadius: `${style.cornerRadius.bottomRight}px`,
    marginTop: `${style.margin?.top ?? 0}px`,
    marginBottom: `${style.margin?.bottom ?? 0}px`,
    marginLeft: `${style.margin?.left ?? 0}px`,
    marginRight: `${style.margin?.right ?? 0}px`,
    alignSelf:
      style.alignment === 'left'
        ? 'flex-start'
        : style.alignment === 'right'
          ? 'flex-end'
          : 'center',
  }
}

export function buildCornerRadius(radius) {
  return {
    borderTopLeftRadius: `${radius.topLeft}px`,
    borderTopRightRadius: `${radius.topRight}px`,
    borderBottomLeftRadius: `${radius.bottomLeft}px`,
    borderBottomRightRadius: `${radius.bottomRight}px`,
  }
}

export function buildMarginStyle(margin = {}) {
  return {
    marginTop: `${margin.top ?? 0}px`,
    marginBottom: `${margin.bottom ?? 0}px`,
    marginLeft: `${margin.left ?? 0}px`,
    marginRight: `${margin.right ?? 0}px`,
  }
}

export function updateNestedPath(obj, path, value) {
  const keys = path.split('.')
  const result = structuredClone(obj)
  let current = result

  for (let i = 0; i < keys.length - 1; i += 1) {
    current[keys[i]] = { ...current[keys[i]] }
    current = current[keys[i]]
  }

  current[keys[keys.length - 1]] = value
  return result
}

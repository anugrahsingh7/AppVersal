import FormField from './FormField'
import { FONT_FAMILIES, FONT_WEIGHTS } from '../../constants/defaults'
import SelectInput from './SelectInput'
import ColorInput from './ColorInput'
import NumberInput from './NumberInput'
import Toggle from './Toggle'

const alignments = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

function StyleToggles({ value, onChange }) {
  const toggles = [
    { key: 'bold', label: 'Bold' },
    { key: 'italic', label: 'Italic' },
    { key: 'underline', label: 'Underline' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {toggles.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange({ ...value, [key]: !value[key] })}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            value[key]
              ? 'border-brand-500 bg-brand-50 text-brand-700'
              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function TextStyleControls({ value, onChange, showAlignment = true }) {
  return (
    <div className="space-y-4">
      <FormField label="Color">
        <ColorInput value={value.color} onChange={(color) => onChange({ ...value, color })} />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Font Family">
          <SelectInput
            value={value.fontFamily}
            onChange={(fontFamily) => onChange({ ...value, fontFamily })}
            options={FONT_FAMILIES}
          />
        </FormField>
        <FormField label="Font Size">
          <NumberInput
            value={value.fontSize}
            onChange={(fontSize) => onChange({ ...value, fontSize })}
            min={10}
            max={48}
            suffix="px"
          />
        </FormField>
      </div>

      <FormField label="Font Weight">
        <SelectInput
          value={value.fontWeight}
          onChange={(fontWeight) => onChange({ ...value, fontWeight })}
          options={FONT_WEIGHTS}
        />
      </FormField>

      <FormField label="Font Style">
        <StyleToggles value={value} onChange={onChange} />
      </FormField>

      {showAlignment && (
        <FormField label="Alignment">
          <div className="flex gap-2">
            {alignments.map(({ value: alignValue, label }) => (
              <button
                key={alignValue}
                type="button"
                onClick={() => onChange({ ...value, alignment: alignValue })}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  value.alignment === alignValue
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-zinc-200 bg-white text-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FormField>
      )}
    </div>
  )
}

export function OptionStyleControls({ value, onChange, showAlignment = true }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Border Color">
          <ColorInput
            value={value.borderColor}
            onChange={(borderColor) => onChange({ ...value, borderColor })}
          />
        </FormField>
        <FormField label="Text Color">
          <ColorInput
            value={value.textColor}
            onChange={(textColor) => onChange({ ...value, textColor })}
          />
        </FormField>
        <FormField label="Background">
          <ColorInput
            value={value.backgroundColor}
            onChange={(backgroundColor) => onChange({ ...value, backgroundColor })}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Border Width">
          <NumberInput
            value={value.borderWidth}
            onChange={(borderWidth) => onChange({ ...value, borderWidth })}
            min={0}
            max={8}
            suffix="px"
          />
        </FormField>
        <FormField label="Font Size">
          <NumberInput
            value={value.fontSize}
            onChange={(fontSize) => onChange({ ...value, fontSize })}
            min={10}
            max={32}
            suffix="px"
          />
        </FormField>
      </div>

      <FormField label="Font Family">
        <SelectInput
          value={value.fontFamily}
          onChange={(fontFamily) => onChange({ ...value, fontFamily })}
          options={FONT_FAMILIES}
        />
      </FormField>

      <FormField label="Font Weight">
        <SelectInput
          value={value.fontWeight}
          onChange={(fontWeight) => onChange({ ...value, fontWeight })}
          options={FONT_WEIGHTS}
        />
      </FormField>

      <FormField label="Font Style">
        <StyleToggles value={value} onChange={onChange} />
      </FormField>

      {showAlignment && (
        <FormField label="Alignment">
          <div className="flex gap-2">
            {alignments.map(({ value: alignValue, label }) => (
              <button
                key={alignValue}
                type="button"
                onClick={() => onChange({ ...value, alignment: alignValue })}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  value.alignment === alignValue
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-zinc-200 bg-white text-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FormField>
      )}
    </div>
  )
}

export function ButtonStyleControls({ value, onChange }) {
  return (
    <div className="space-y-4">
      <FormField label="Full Width">
        <Toggle
          checked={value.fullWidth}
          onChange={(fullWidth) => onChange({ ...value, fullWidth })}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Border Color">
          <ColorInput
            value={value.borderColor}
            onChange={(borderColor) => onChange({ ...value, borderColor })}
          />
        </FormField>
        <FormField label="Text Color">
          <ColorInput
            value={value.textColor}
            onChange={(textColor) => onChange({ ...value, textColor })}
          />
        </FormField>
        <FormField label="Background">
          <ColorInput
            value={value.backgroundColor}
            onChange={(backgroundColor) => onChange({ ...value, backgroundColor })}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Font Family">
          <SelectInput
            value={value.fontFamily}
            onChange={(fontFamily) => onChange({ ...value, fontFamily })}
            options={FONT_FAMILIES}
          />
        </FormField>
        <FormField label="Font Size">
          <NumberInput
            value={value.fontSize}
            onChange={(fontSize) => onChange({ ...value, fontSize })}
            min={10}
            max={32}
            suffix="px"
          />
        </FormField>
      </div>

      <FormField label="Font Style">
        <StyleToggles value={value} onChange={onChange} />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Height">
          <NumberInput
            value={value.height}
            onChange={(height) => onChange({ ...value, height })}
            min={32}
            max={80}
            suffix="px"
          />
        </FormField>
        <FormField label="Width">
          <NumberInput
            value={value.width}
            onChange={(width) => onChange({ ...value, width })}
            min={80}
            max={400}
            suffix="px"
            className={value.fullWidth ? 'opacity-50' : ''}
          />
        </FormField>
        <FormField label="Border Width">
          <NumberInput
            value={value.borderWidth}
            onChange={(borderWidth) => onChange({ ...value, borderWidth })}
            min={0}
            max={8}
            suffix="px"
          />
        </FormField>
      </div>

      <FormField label="Alignment">
        <div className="flex gap-2">
          {alignments.map(({ value: alignValue, label }) => (
            <button
              key={alignValue}
              type="button"
              onClick={() => onChange({ ...value, alignment: alignValue })}
              className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                value.alignment === alignValue
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-zinc-200 bg-white text-zinc-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </FormField>
    </div>
  )
}

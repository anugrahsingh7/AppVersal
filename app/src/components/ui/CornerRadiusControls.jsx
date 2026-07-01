import FormField from './FormField'

const corners = [
  { key: 'topLeft', label: 'TL' },
  { key: 'topRight', label: 'TR' },
  { key: 'bottomLeft', label: 'BL' },
  { key: 'bottomRight', label: 'BR' },
]

export default function CornerRadiusControls({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {corners.map(({ key, label }) => (
        <FormField key={key} label={label}>
          <input
            type="number"
            min={0}
            value={value[key]}
            onChange={(event) =>
              onChange({ ...value, [key]: Number(event.target.value) || 0 })
            }
            className="field-input"
          />
        </FormField>
      ))}
    </div>
  )
}

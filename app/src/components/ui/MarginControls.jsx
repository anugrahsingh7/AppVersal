import FormField from './FormField'

export default function MarginControls({ value, onChange }) {
  const sides = [
    { key: 'top', label: 'Top' },
    { key: 'bottom', label: 'Bottom' },
    { key: 'left', label: 'Left' },
    { key: 'right', label: 'Right' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {sides.map(({ key, label }) => (
        <FormField key={key} label={label}>
          <input
            type="number"
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

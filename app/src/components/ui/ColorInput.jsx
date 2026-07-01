export default function ColorInput({ value, onChange, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative shrink-0">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="h-9 w-9 cursor-pointer rounded-lg border border-zinc-200 bg-white p-0.5"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input min-w-0 flex-1 uppercase"
      />
    </div>
  )
}

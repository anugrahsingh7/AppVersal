export default function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  className = '',
}) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`field-input ${suffix ? 'pr-10' : ''} ${className}`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">
          {suffix}
        </span>
      )}
    </div>
  )
}

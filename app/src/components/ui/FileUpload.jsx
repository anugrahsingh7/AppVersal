import { useRef } from 'react'
import { IconUpload } from './Icons'

export default function FileUpload({
  accept,
  onChange,
  fileName,
  onClear,
  hint,
}) {
  const inputRef = useRef(null)

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 px-4 py-6 text-center transition hover:border-brand-500 hover:bg-brand-50/40"
      >
        <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-200">
          <IconUpload />
        </span>
        <span className="text-sm font-medium text-zinc-800">Choose a file</span>
        {hint && <span className="mt-1 text-xs text-zinc-500">{hint}</span>}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      {fileName && (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-zinc-50 px-3 py-2 ring-1 ring-zinc-200/80">
          <span className="truncate text-xs text-zinc-600">{fileName}</span>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="shrink-0 text-xs font-medium text-zinc-500 hover:text-red-600"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

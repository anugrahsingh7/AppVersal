import { useState } from 'react'
import { IconChevron } from './Icons'

export default function CollapsibleSection({
  title,
  description,
  defaultOpen = false,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <details
      className="group overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 marker:content-none transition hover:bg-zinc-50/80">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{description}</p>
          )}
        </div>
        <IconChevron className="h-4 w-4 text-zinc-400" open={open} />
      </summary>
      <div className="space-y-4 border-t border-zinc-100 px-4 py-4">{children}</div>
    </details>
  )
}

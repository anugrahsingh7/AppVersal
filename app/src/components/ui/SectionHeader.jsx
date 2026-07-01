export default function SectionHeader({ title, description, action }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-5">
      <div>
        <h2 className="text-[1.05rem] font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description && (
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

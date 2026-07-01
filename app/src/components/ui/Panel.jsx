export default function Panel({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  )
}

export function PanelBody({ children, className = '' }) {
  return <div className={`space-y-5 p-5 ${className}`}>{children}</div>
}

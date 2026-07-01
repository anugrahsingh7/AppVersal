const variants = {
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 disabled:bg-zinc-300',
  secondary:
    'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300',
  ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
  danger: 'border border-red-200 bg-white text-red-600 hover:bg-red-50',
  brand:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-700 disabled:bg-zinc-300',
}

const sizes = {
  sm: 'h-8 gap-1.5 px-3 text-xs',
  md: 'h-9 gap-2 px-3.5 text-sm',
  lg: 'h-10 gap-2 px-4 text-sm',
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
    </button>
  )
}

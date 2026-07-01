import { IconSurvey } from '../ui/Icons'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white">
            <IconSurvey className="h-[18px] w-[18px]" />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight text-zinc-900">
              Survey Campaign Builder
            </h1>
            <p className="hidden text-xs text-zinc-500 sm:block">Content · Styling · Preview</p>
          </div>
        </div>
      </div>
    </header>
  )
}

import ContentTab from '../builder/content/ContentTab'
import StylingTab from '../builder/styling/StylingTab'
import MobilePreview from '../preview/MobilePreview'
import { IconLayout, IconPalette } from '../ui/Icons'
import { useSurvey } from '../../context/SurveyContext'

export default function BuilderLayout() {
  const { activeTab, setActiveTab } = useSurvey()

  const tabs = [
    { id: 'content', label: 'Content', icon: IconLayout },
    { id: 'styling', label: 'Styling', icon: IconPalette },
  ]

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-6">
        <section className="min-w-0">
          <div className="mb-4 flex border-b border-zinc-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'border-brand-600 text-zinc-900'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="animate-fade-up rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:p-6">
            {activeTab === 'content' ? <ContentTab /> : <StylingTab />}
          </div>
        </section>

        <aside className="xl:sticky xl:top-[4.5rem] xl:self-start">
          <MobilePreview />
        </aside>
      </div>
    </main>
  )
}

import IntroductionSection from './IntroductionSection'
import QuestionSection from './QuestionSection'
import ThankYouSection from './ThankYouSection'
import { useSurvey } from '../../../context/SurveyContext'

export default function ContentTab() {
  const {
    activeContentSection,
    setActiveContentSection,
    questions,
    activeQuestionId,
    setActiveQuestionId,
  } = useSurvey()

  const navItems = [
    { id: 'introduction', label: 'Introduction', step: 'Setup' },
    ...questions.map((question, index) => ({
      id: question.id,
      label: `Question ${index + 1}`,
      step: `Q${index + 1}`,
      type: 'question',
    })),
    { id: 'thank-you', label: 'Thank You', step: 'End' },
  ]

  const renderSection = () => {
    if (activeContentSection === 'introduction') {
      return <IntroductionSection />
    }

    if (activeContentSection === 'thank-you') {
      return <ThankYouSection />
    }

    const questionIndex = questions.findIndex(
      (question) => question.id === activeContentSection || question.id === activeQuestionId,
    )
    const question = questions[questionIndex]

    if (!question) {
      return <IntroductionSection />
    }

    return <QuestionSection question={question} index={questionIndex} />
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside className="lg:w-56 lg:shrink-0">
        <p className="mb-2 hidden text-[11px] font-semibold uppercase tracking-wider text-zinc-400 lg:block">
          Pages
        </p>
        <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {navItems.map((item) => {
            const isQuestion = item.type === 'question'
            const isActive = isQuestion
              ? activeContentSection === item.id || activeQuestionId === item.id
              : activeContentSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isQuestion) {
                    setActiveQuestionId(item.id)
                  } else {
                    setActiveContentSection(item.id)
                  }
                }}
                className={`group flex min-w-[120px] items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition lg:min-w-0 ${
                  isActive
                    ? 'bg-zinc-900 font-medium text-white shadow-sm'
                    : 'text-zinc-600 ring-1 ring-zinc-200/80 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'bg-zinc-100 text-zinc-500 group-hover:bg-white'
                  }`}
                >
                  {item.step}
                </span>
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{renderSection()}</div>
    </div>
  )
}

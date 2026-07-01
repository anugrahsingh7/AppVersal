import { useEffect, useState } from 'react'
import { buildCornerRadius } from '../../utils/styleHelpers'
import { useSurvey } from '../../context/SurveyContext'
import QuestionScreen from './QuestionScreen'
import ThankYouScreen from './ThankYouScreen'

function PreviewProgress({ total, current, thankYouEnabled, onSelect }) {
  const steps = [
    ...Array.from({ length: total }, (_, index) => ({
      id: `q-${index}`,
      label: `Q${index + 1}`,
      index,
    })),
    ...(thankYouEnabled ? [{ id: 'thank-you', label: 'End', index: total }] : []),
  ]

  return (
    <div className="flex items-center gap-1">
      {steps.map((step) => {
        const isActive = current === step.index
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(step.index)}
            className={`rounded-md px-2 py-1 text-[10px] font-semibold transition ${
              isActive
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {step.label}
          </button>
        )
      })}
    </div>
  )
}

export default function MobilePreview() {
  const {
    questions,
    thankYou,
    styling,
    previewQuestionIndex,
    previewSelections,
    previewComment,
    setPreviewSelection,
    setPreviewComment,
    goToNextPreviewScreen,
    resetPreview,
    setPreviewQuestionIndex,
  } = useSurvey()

  const [visible, setVisible] = useState(true)
  const isThankYouScreen = thankYou.enabled && previewQuestionIndex >= questions.length
  const currentQuestion = questions[previewQuestionIndex]

  useEffect(() => {
    if (styling.appearance.delay <= 0) {
      setVisible(true)
      return undefined
    }

    setVisible(false)
    const timer = setTimeout(() => setVisible(true), styling.appearance.delay * 1000)
    return () => clearTimeout(timer)
  }, [styling.appearance.delay, previewQuestionIndex])

  const handleClose = () => {
    resetPreview()
  }

  const handleThankYouAction = () => {
    if (thankYou.redirectTo === 'url' && thankYou.redirectUrl) {
      window.open(thankYou.redirectUrl, '_blank', 'noopener,noreferrer')
    } else {
      resetPreview()
    }
  }

  const containerStyle = {
    backgroundColor: styling.appearance.backgroundColor,
    ...buildCornerRadius(styling.appearance.cornerRadius),
  }

  const backdropStyle = {
    backgroundColor: styling.appearance.backdropColor,
    opacity: styling.appearance.backdropOpacity / 100,
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-xs font-semibold text-white">Preview</p>
          <p className="text-[11px] text-zinc-400">Mobile · 390px</p>
        </div>
        <PreviewProgress
          total={questions.length}
          current={previewQuestionIndex}
          thankYouEnabled={thankYou.enabled}
          onSelect={setPreviewQuestionIndex}
        />
      </div>

      <div className="preview-shell px-5 py-6">
        <div className="relative mx-auto w-full max-w-[300px]">
          <div
            className="absolute -inset-3 -z-10 rounded-[2rem]"
            style={backdropStyle}
          />

          <div className="rounded-[2rem] bg-zinc-950 p-2.5 ring-1 ring-white/10">
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[10px] font-medium text-zinc-500">9:41</span>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-zinc-600" />
                <span className="h-2 w-2 rounded-full bg-zinc-600" />
                <span className="h-2 w-3 rounded-sm bg-zinc-600" />
              </div>
            </div>

            <div
              className={`relative min-h-[520px] overflow-hidden p-4 transition-opacity duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={containerStyle}
            >
              {isThankYouScreen ? (
                <ThankYouScreen
                  thankYou={thankYou}
                  styling={styling}
                  onClose={handleClose}
                  onAction={handleThankYouAction}
                />
              ) : (
                currentQuestion && (
                  <QuestionScreen
                    question={currentQuestion}
                    questionIndex={previewQuestionIndex}
                    totalQuestions={questions.length}
                    styling={styling}
                    selectedOptionId={previewSelections[currentQuestion.id]}
                    comment={previewComment}
                    onSelectOption={(optionId) =>
                      setPreviewSelection(currentQuestion.id, optionId)
                    }
                    onCommentChange={setPreviewComment}
                    onSubmit={goToNextPreviewScreen}
                    onClose={handleClose}
                  />
                )
              )}
            </div>

            <div className="flex justify-center py-2">
              <div className="h-1 w-24 rounded-full bg-zinc-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

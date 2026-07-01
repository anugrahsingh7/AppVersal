import { buildButtonStyle, buildOptionStyle, buildTextStyle } from '../../utils/styleHelpers'
import CrossButton from './CrossButton'
import OptionItem from './OptionItem'

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  styling,
  selectedOptionId,
  comment,
  onSelectOption,
  onCommentChange,
  onSubmit,
  onClose,
}) {
  const titleStyle = buildTextStyle(styling.questionTitle)
  const subtitleStyle = buildTextStyle(styling.subtitle)
  const buttonStyle = buildButtonStyle(styling.ctaButton)
  const commentStyle = buildOptionStyle(styling.additionalComment)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start">
        <div className="flex-1">
          <p className="text-[11px] font-medium tabular-nums text-zinc-400">
            {questionIndex + 1} of {totalQuestions}
          </p>
        </div>
        <CrossButton config={styling.crossButton} onClick={onClose} />
      </div>

      <div className="mt-2 flex-1 overflow-y-auto">
        <h2 style={titleStyle}>{question.title}</h2>
        <p style={subtitleStyle}>{question.subtitle}</p>

        <div
          className="flex flex-col"
          style={{ gap: `${styling.optionList.optionSpacing}px` }}
        >
          {question.options.map((option) => (
            <OptionItem
              key={option.id}
              option={option}
              layout={styling.optionList.layout}
              selected={selectedOptionId === option.id}
              height={styling.optionList.height}
              spacing={styling.optionList.bulletSpacing}
              cornerRadius={styling.optionList.cornerRadius}
              selectedStyle={styling.selectedOption}
              unselectedStyle={styling.unselectedOption}
              onSelect={onSelectOption}
            />
          ))}
        </div>

        {question.allowComments && (
          <textarea
            value={comment}
            onChange={(event) => onCommentChange(event.target.value)}
            placeholder="Share any additional thoughts..."
            rows={3}
            style={{
              ...commentStyle,
              marginTop: `${styling.optionList.optionSpacing}px`,
              width: '100%',
              padding: '10px 12px',
              borderRadius: `${styling.optionList.cornerRadius.topLeft}px`,
              resize: 'none',
              outline: 'none',
            }}
          />
        )}
      </div>

      <div className="mt-4 flex w-full">
        <button
          type="button"
          onClick={onSubmit}
          style={buttonStyle}
          className="cursor-pointer font-medium transition hover:opacity-90"
        >
          {question.submitButtonText}
        </button>
      </div>
    </div>
  )
}

import FormField from '../../ui/FormField'
import TextInput from '../../ui/TextInput'
import Toggle from '../../ui/Toggle'
import SelectInput from '../../ui/SelectInput'
import SectionHeader from '../../ui/SectionHeader'
import Panel, { PanelBody } from '../../ui/Panel'
import Button from '../../ui/Button'
import { IconEye, IconPlus, IconTrash } from '../../ui/Icons'
import { useSurvey } from '../../../context/SurveyContext'

export default function QuestionSection({ question, index }) {
  const {
    updateQuestion,
    addOption,
    updateOption,
    removeOption,
    addCondition,
    updateCondition,
    removeCondition,
    questions,
    thankYou,
    setPreviewQuestionIndex,
  } = useSurvey()

  const redirectTargets = [
    { value: 'next', label: 'Next question' },
    ...(thankYou.enabled ? [{ value: 'thank-you', label: 'Thank you page' }] : []),
    ...questions
      .filter((item) => item.id !== question.id)
      .map((item, itemIndex) => ({
        value: `question:${item.id}`,
        label: `Question ${itemIndex + 1}`,
      })),
  ]

  return (
    <section className="space-y-6">
      <SectionHeader
        title={`Question ${index + 1}`}
        description="Set the question copy, response options, and routing rules."
        action={
          <Button
            variant="secondary"
            size="sm"
            icon={IconEye}
            onClick={() => setPreviewQuestionIndex(index)}
          >
            View in preview
          </Button>
        }
      />

      <Panel>
        <PanelBody>
          <FormField label="Question title">
            <TextInput
              value={question.title}
              onChange={(title) => updateQuestion(question.id, { title })}
            />
          </FormField>

          <FormField label="Question description">
            <TextInput
              value={question.subtitle}
              onChange={(subtitle) => updateQuestion(question.id, { subtitle })}
            />
          </FormField>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[13px] font-semibold text-zinc-800">Answer options</h3>
              <Button variant="primary" size="sm" icon={IconPlus} onClick={() => addOption(question.id)}>
                Add option
              </Button>
            </div>

            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={option.id} className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-medium text-zinc-500">
                    {optionIndex + 1}
                  </span>
                  <TextInput
                    value={option.text}
                    onChange={(text) => updateOption(question.id, option.id, text)}
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                  <button
                    type="button"
                    disabled={question.options.length <= 2}
                    onClick={() => removeOption(question.id, option.id)}
                    aria-label="Remove option"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-zinc-50 px-4 py-3 ring-1 ring-zinc-200/70">
            <Toggle
              label="Additional comments"
              description="Show a free-text field below the options."
              checked={question.allowComments}
              onChange={(allowComments) => updateQuestion(question.id, { allowComments })}
            />
          </div>

          <div className="space-y-3 border-t border-zinc-100 pt-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-[13px] font-semibold text-zinc-800">Conditional logic</h3>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Route respondents based on their selected answer.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => addCondition(question.id)}>
                Add rule
              </Button>
            </div>

            {question.conditions.length === 0 ? (
              <p className="rounded-lg border border-dashed border-zinc-200 px-4 py-3 text-xs leading-relaxed text-zinc-500">
                No routing rules yet. Add a rule to send users to a specific page when they pick
                an option.
              </p>
            ) : (
              question.conditions.map((condition) => (
                <div
                  key={condition.id}
                  className="grid gap-3 rounded-lg bg-zinc-50 p-3 ring-1 ring-zinc-200/70 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <FormField label="If selected">
                    <SelectInput
                      value={condition.optionId}
                      onChange={(optionId) =>
                        updateCondition(question.id, condition.id, { optionId })
                      }
                      options={question.options.map((option) => ({
                        value: option.id,
                        label: option.text,
                      }))}
                    />
                  </FormField>
                  <FormField label="Then go to">
                    <SelectInput
                      value={condition.redirectTo}
                      onChange={(redirectTo) =>
                        updateCondition(question.id, condition.id, { redirectTo })
                      }
                      options={redirectTargets}
                    />
                  </FormField>
                  <div className="flex items-end">
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => removeCondition(question.id, condition.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <FormField label="Submit button text">
            <TextInput
              value={question.submitButtonText}
              onChange={(submitButtonText) =>
                updateQuestion(question.id, { submitButtonText })
              }
            />
          </FormField>
        </PanelBody>
      </Panel>
    </section>
  )
}

import FormField from '../../ui/FormField'
import TextInput from '../../ui/TextInput'
import Toggle from '../../ui/Toggle'
import SelectInput from '../../ui/SelectInput'
import SectionHeader from '../../ui/SectionHeader'
import Panel, { PanelBody } from '../../ui/Panel'
import FileUpload from '../../ui/FileUpload'
import { ACCEPTED_MEDIA_TYPES, REDIRECT_OPTIONS } from '../../../constants/defaults'
import { useSurvey } from '../../../context/SurveyContext'

export default function ThankYouSection() {
  const { thankYou, updateThankYou } = useSurvey()

  const handleMediaUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isLottie =
      file.type === 'application/json' || file.name.toLowerCase().endsWith('.lottie')
    const isImage = file.type.startsWith('image/')

    if (!isLottie && !isImage) return

    if (thankYou.mediaUrl) {
      URL.revokeObjectURL(thankYou.mediaUrl)
    }

    updateThankYou({
      mediaUrl: URL.createObjectURL(file),
      mediaType: isLottie ? 'lottie' : file.type,
      mediaName: file.name,
    })
  }

  const clearMedia = () => {
    if (thankYou.mediaUrl) {
      URL.revokeObjectURL(thankYou.mediaUrl)
    }
    updateThankYou({ mediaUrl: null, mediaType: null, mediaName: '' })
  }

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Thank you page"
        description="Show a closing screen after the last question with optional media and a call to action."
      />

      <Panel>
        <PanelBody>
          <Toggle
            label="Enable thank you page"
            description="Include a final screen at the end of the survey."
            checked={thankYou.enabled}
            onChange={(enabled) => updateThankYou({ enabled })}
          />

          {thankYou.enabled && (
            <div className="space-y-5 border-t border-zinc-100 pt-5">
              <FormField label="Media">
                <FileUpload
                  accept={ACCEPTED_MEDIA_TYPES.join(',')}
                  onChange={handleMediaUpload}
                  fileName={thankYou.mediaName}
                  onClear={thankYou.mediaUrl ? clearMedia : undefined}
                  hint="PNG, JPG, GIF, or Lottie JSON"
                />
              </FormField>

              <FormField label="Title">
                <TextInput
                  value={thankYou.title}
                  onChange={(title) => updateThankYou({ title })}
                />
              </FormField>

              <FormField label="Description">
                <TextInput
                  value={thankYou.subtitle}
                  onChange={(subtitle) => updateThankYou({ subtitle })}
                />
              </FormField>

              <FormField label="Button label">
                <TextInput
                  value={thankYou.buttonText}
                  onChange={(buttonText) => updateThankYou({ buttonText })}
                />
              </FormField>

              <FormField label="After click">
                <SelectInput
                  value={thankYou.redirectTo}
                  onChange={(redirectTo) => updateThankYou({ redirectTo })}
                  options={REDIRECT_OPTIONS}
                />
              </FormField>

              {thankYou.redirectTo === 'url' && (
                <FormField label="Destination URL">
                  <TextInput
                    type="url"
                    value={thankYou.redirectUrl}
                    onChange={(redirectUrl) => updateThankYou({ redirectUrl })}
                    placeholder="https://"
                  />
                </FormField>
              )}
            </div>
          )}
        </PanelBody>
      </Panel>
    </section>
  )
}

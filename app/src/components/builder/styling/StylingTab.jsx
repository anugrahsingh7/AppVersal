import CollapsibleSection from '../../ui/CollapsibleSection'
import SectionHeader from '../../ui/SectionHeader'
import FormField from '../../ui/FormField'
import ColorInput from '../../ui/ColorInput'
import NumberInput from '../../ui/NumberInput'
import CornerRadiusControls from '../../ui/CornerRadiusControls'
import MarginControls from '../../ui/MarginControls'
import SelectInput from '../../ui/SelectInput'
import Toggle from '../../ui/Toggle'
import FileUpload from '../../ui/FileUpload'
import {
  ButtonStyleControls,
  OptionStyleControls,
  TextStyleControls,
} from '../../ui/StyleControls'
import { CROSS_BUTTON_STYLES, OPTION_LAYOUTS } from '../../../constants/defaults'
import { useSurvey } from '../../../context/SurveyContext'

export default function StylingTab() {
  const { styling, updateStyling } = useSurvey()

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Styling"
        description="Fine-tune colors, typography, spacing, and component appearance. Changes apply to the preview immediately."
      />

      <div className="space-y-4">
      <CollapsibleSection
        title="Appearance"
        description="Survey container, backdrop, and display settings"
        defaultOpen
      >
        <FormField label="Background Color">
          <ColorInput
            value={styling.appearance.backgroundColor}
            onChange={(value) => updateStyling('appearance.backgroundColor', value)}
          />
        </FormField>
        <FormField label="Corner Radius">
          <CornerRadiusControls
            value={styling.appearance.cornerRadius}
            onChange={(value) => updateStyling('appearance.cornerRadius', value)}
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Display Delay">
            <NumberInput
              value={styling.appearance.delay}
              onChange={(value) => updateStyling('appearance.delay', value)}
              min={0}
              max={10}
              suffix="sec"
            />
          </FormField>
          <FormField label="Backdrop Opacity">
            <NumberInput
              value={styling.appearance.backdropOpacity}
              onChange={(value) => updateStyling('appearance.backdropOpacity', value)}
              min={0}
              max={100}
              suffix="%"
            />
          </FormField>
        </div>
        <FormField label="Backdrop Color">
          <ColorInput
            value={styling.appearance.backdropColor}
            onChange={(value) => updateStyling('appearance.backdropColor', value)}
          />
        </FormField>
      </CollapsibleSection>

      <CollapsibleSection title="Question Title Styling">
        <TextStyleControls
          value={styling.questionTitle}
          onChange={(value) => updateStyling('questionTitle', value)}
        />
        <FormField label="Margins">
          <MarginControls
            value={styling.questionTitle.margin}
            onChange={(value) =>
              updateStyling('questionTitle', { ...styling.questionTitle, margin: value })
            }
          />
        </FormField>
      </CollapsibleSection>

      <CollapsibleSection title="Subtitle Styling">
        <TextStyleControls
          value={styling.subtitle}
          onChange={(value) => updateStyling('subtitle', value)}
        />
        <FormField label="Margins">
          <MarginControls
            value={styling.subtitle.margin}
            onChange={(value) =>
              updateStyling('subtitle', { ...styling.subtitle, margin: value })
            }
          />
        </FormField>
      </CollapsibleSection>

      <CollapsibleSection title="Option List Style">
        <FormField label="Option Layout">
          <SelectInput
            value={styling.optionList.layout}
            onChange={(value) => updateStyling('optionList.layout', value)}
            options={OPTION_LAYOUTS}
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Option Height">
            <NumberInput
              value={styling.optionList.height}
              onChange={(value) => updateStyling('optionList.height', value)}
              min={36}
              max={80}
              suffix="px"
            />
          </FormField>
          <FormField label="Option Spacing">
            <NumberInput
              value={styling.optionList.optionSpacing}
              onChange={(value) => updateStyling('optionList.optionSpacing', value)}
              min={4}
              max={32}
              suffix="px"
            />
          </FormField>
          <FormField label="Bullet Spacing">
            <NumberInput
              value={styling.optionList.bulletSpacing}
              onChange={(value) => updateStyling('optionList.bulletSpacing', value)}
              min={4}
              max={32}
              suffix="px"
            />
          </FormField>
        </div>
        <FormField label="Corner Radius">
          <CornerRadiusControls
            value={styling.optionList.cornerRadius}
            onChange={(value) => updateStyling('optionList.cornerRadius', value)}
          />
        </FormField>
      </CollapsibleSection>

      <CollapsibleSection title="Selected Option Styling">
        <OptionStyleControls
          value={styling.selectedOption}
          onChange={(value) => updateStyling('selectedOption', value)}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Unselected Option Styling">
        <OptionStyleControls
          value={styling.unselectedOption}
          onChange={(value) => updateStyling('unselectedOption', value)}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Additional Comment Styling">
        <OptionStyleControls
          value={styling.additionalComment}
          onChange={(value) => updateStyling('additionalComment', value)}
          showAlignment
        />
      </CollapsibleSection>

      <CollapsibleSection title="CTA Button Styling">
        <ButtonStyleControls
          value={styling.ctaButton}
          onChange={(value) => updateStyling('ctaButton', value)}
        />
        <FormField label="Corner Radius">
          <CornerRadiusControls
            value={styling.ctaButton.cornerRadius}
            onChange={(value) =>
              updateStyling('ctaButton', { ...styling.ctaButton, cornerRadius: value })
            }
          />
        </FormField>
        <FormField label="Margins">
          <MarginControls
            value={styling.ctaButton.margin}
            onChange={(value) =>
              updateStyling('ctaButton', { ...styling.ctaButton, margin: value })
            }
          />
        </FormField>
      </CollapsibleSection>

      <CollapsibleSection
        title="Cross button"
        description="Close control shown on survey screens"
      >
        <Toggle
          label="Show close button"
          checked={styling.crossButton.enabled}
          onChange={(value) =>
            updateStyling('crossButton', { ...styling.crossButton, enabled: value })
          }
        />
        <FormField label="Style preset">
          <SelectInput
            value={styling.crossButton.style}
            onChange={(value) =>
              updateStyling('crossButton', { ...styling.crossButton, style: value })
            }
            options={CROSS_BUTTON_STYLES}
          />
        </FormField>
        <FormField label="Custom icon">
          <FileUpload
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              const url = URL.createObjectURL(file)
              updateStyling('crossButton', { ...styling.crossButton, customIconUrl: url })
            }}
            fileName={styling.crossButton.customIconUrl ? 'Custom icon uploaded' : ''}
            onClear={
              styling.crossButton.customIconUrl
                ? () =>
                    updateStyling('crossButton', {
                      ...styling.crossButton,
                      customIconUrl: null,
                    })
                : undefined
            }
            hint="PNG, JPG, or SVG"
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Cross Color">
            <ColorInput
              value={styling.crossButton.color}
              onChange={(value) =>
                updateStyling('crossButton', { ...styling.crossButton, color: value })
              }
            />
          </FormField>
          <FormField label="Fill Color">
            <ColorInput
              value={styling.crossButton.fillColor}
              onChange={(value) =>
                updateStyling('crossButton', { ...styling.crossButton, fillColor: value })
              }
            />
          </FormField>
          <FormField label="Stroke Color">
            <ColorInput
              value={styling.crossButton.strokeColor}
              onChange={(value) =>
                updateStyling('crossButton', { ...styling.crossButton, strokeColor: value })
              }
            />
          </FormField>
        </div>
        <FormField label="Size">
          <NumberInput
            value={styling.crossButton.size}
            onChange={(value) =>
              updateStyling('crossButton', { ...styling.crossButton, size: value })
            }
            min={16}
            max={48}
            suffix="px"
          />
        </FormField>
        <FormField label="Margins">
          <MarginControls
            value={styling.crossButton.margin}
            onChange={(value) =>
              updateStyling('crossButton', { ...styling.crossButton, margin: value })
            }
          />
        </FormField>
      </CollapsibleSection>

      <CollapsibleSection
        title="Thank you page"
        description="Typography and layout for the closing screen"
      >
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-800">Title</h4>
            <TextStyleControls
              value={styling.thankYouTitle}
              onChange={(value) => updateStyling('thankYouTitle', value)}
            />
            <FormField label="Margins" className="mt-4">
              <MarginControls
                value={styling.thankYouTitle.margin}
                onChange={(value) =>
                  updateStyling('thankYouTitle', { ...styling.thankYouTitle, margin: value })
                }
              />
            </FormField>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-800">Subtitle</h4>
            <TextStyleControls
              value={styling.thankYouSubtitle}
              onChange={(value) => updateStyling('thankYouSubtitle', value)}
            />
            <FormField label="Margins" className="mt-4">
              <MarginControls
                value={styling.thankYouSubtitle.margin}
                onChange={(value) =>
                  updateStyling('thankYouSubtitle', {
                    ...styling.thankYouSubtitle,
                    margin: value,
                  })
                }
              />
            </FormField>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-800">Image</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Width">
                <NumberInput
                  value={styling.thankYouImage.width}
                  onChange={(value) => updateStyling('thankYouImage.width', value)}
                  min={40}
                  max={320}
                  suffix="px"
                />
              </FormField>
              <FormField label="Height">
                <NumberInput
                  value={styling.thankYouImage.height}
                  onChange={(value) => updateStyling('thankYouImage.height', value)}
                  min={40}
                  max={320}
                  suffix="px"
                />
              </FormField>
            </div>
            <FormField label="Margins" className="mt-4">
              <MarginControls
                value={styling.thankYouImage.margin}
                onChange={(value) =>
                  updateStyling('thankYouImage', { ...styling.thankYouImage, margin: value })
                }
              />
            </FormField>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-800">Button</h4>
            <ButtonStyleControls
              value={styling.thankYouButton}
              onChange={(value) => updateStyling('thankYouButton', value)}
            />
            <FormField label="Corner Radius" className="mt-4">
              <CornerRadiusControls
                value={styling.thankYouButton.cornerRadius}
                onChange={(value) =>
                  updateStyling('thankYouButton', {
                    ...styling.thankYouButton,
                    cornerRadius: value,
                  })
                }
              />
            </FormField>
            <FormField label="Margins" className="mt-4">
              <MarginControls
                value={styling.thankYouButton.margin}
                onChange={(value) =>
                  updateStyling('thankYouButton', { ...styling.thankYouButton, margin: value })
                }
              />
            </FormField>
          </div>
        </div>
      </CollapsibleSection>
      </div>
    </div>
  )
}

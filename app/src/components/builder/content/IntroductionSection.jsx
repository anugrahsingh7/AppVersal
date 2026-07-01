import FormField from '../../ui/FormField'
import NumberInput from '../../ui/NumberInput'
import SectionHeader from '../../ui/SectionHeader'
import Panel, { PanelBody } from '../../ui/Panel'
import { useSurvey } from '../../../context/SurveyContext'

export default function IntroductionSection() {
  const { pageCount, setPageCount, questions } = useSurvey()

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Introduction"
        description="Define how many questions your survey will include. Each page represents one question in the flow."
      />

      <Panel>
        <PanelBody>
          <FormField
            label="Number of survey pages"
            hint={`${questions.length} question${questions.length !== 1 ? 's' : ''} configured`}
          >
            <div className="max-w-[140px]">
              <NumberInput value={pageCount} onChange={setPageCount} min={1} max={10} />
            </div>
          </FormField>
        </PanelBody>
      </Panel>
    </section>
  )
}

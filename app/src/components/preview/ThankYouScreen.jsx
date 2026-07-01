import {
  buildButtonStyle,
  buildMarginStyle,
  buildTextStyle,
} from '../../utils/styleHelpers'
import CrossButton from './CrossButton'
import LottieMedia from './LottieMedia'

export default function ThankYouScreen({ thankYou, styling, onClose, onAction }) {
  const titleStyle = buildTextStyle(styling.thankYouTitle)
  const subtitleStyle = buildTextStyle(styling.thankYouSubtitle)
  const buttonStyle = buildButtonStyle(styling.thankYouButton)
  const imageMargin = buildMarginStyle(styling.thankYouImage.margin)

  const renderMedia = () => {
    if (!thankYou.mediaUrl) return null

    if (thankYou.mediaType === 'lottie' || thankYou.mediaName?.endsWith('.json')) {
      return (
        <LottieMedia
          url={thankYou.mediaUrl}
          style={{
            ...imageMargin,
            width: styling.thankYouImage.width,
            height: styling.thankYouImage.height,
          }}
        />
      )
    }

    return (
      <img
        src={thankYou.mediaUrl}
        alt="Thank you"
        style={{
          ...imageMargin,
          width: styling.thankYouImage.width,
          height: styling.thankYouImage.height,
          objectFit: 'cover',
        }}
        className="mx-auto rounded-xl"
      />
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start">
        <div className="flex-1" />
        <CrossButton config={styling.crossButton} onClick={onClose} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {renderMedia()}
        <h2 style={titleStyle}>{thankYou.title}</h2>
        <p style={subtitleStyle}>{thankYou.subtitle}</p>
        <button
          type="button"
          onClick={onAction}
          style={buttonStyle}
          className="cursor-pointer font-medium transition hover:opacity-90"
        >
          {thankYou.buttonText}
        </button>
      </div>
    </div>
  )
}

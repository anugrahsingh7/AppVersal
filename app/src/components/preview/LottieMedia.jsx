import { lazy, Suspense, useEffect, useState } from 'react'

const Lottie = lazy(() => import('lottie-react'))

export default function LottieMedia({ url, className, style }) {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  if (!animationData) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-zinc-100 ${className}`}
        style={style}
      >
        <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200" />
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div
          className={`flex items-center justify-center rounded-xl bg-zinc-100 ${className}`}
          style={style}
        >
          <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200" />
        </div>
      }
    >
      <Lottie animationData={animationData} loop className={className} style={style} />
    </Suspense>
  )
}

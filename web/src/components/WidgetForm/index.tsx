import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from 'react'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessSteps } from './Steps/FeedbackSuccessSteps'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'imagem de uma lampada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'imagem de um balao de pensamento',
    },
  },
}

export type FeedbackType = keyof typeof feedbackTypes

export const WidgetForm = () => {
  const [feedbackType, setFeedBackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)

  const handleRestartFeedback = () => {
    setFeedbackSend(false)
    setFeedBackType(null)
  }
  return (
    <div
      className={
        'bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'
      }
    >
      {feedbackSend ? (
        <FeedbackSuccessSteps
          onFeedbackRestartRequest={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep setFeedBackType={setFeedBackType} />
          ) : (
            <div>
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequest={handleRestartFeedback}
                onFeedBackSend={() => setFeedbackSend(true)}
              />
            </div>
          )}
        </>
      )}
      <footer className={'text-xs text-neutral-400'}>
        Feito com 🤍 durante a NLW
      </footer>
    </div>
  )
}

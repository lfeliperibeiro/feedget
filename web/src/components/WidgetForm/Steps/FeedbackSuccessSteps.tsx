import { CloseButton } from '../../CloseButton'
import { SuccessSVG } from '../../../assets/SuccessSVG'

type Props = {
  onFeedbackRestartRequest: () => void
}

export const FeedbackSuccessSteps = ({ onFeedbackRestartRequest }: Props) => {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className={'flex flex-col items-center py-10 px-8 w-[304px'}>
        <SuccessSVG />
        <span className={'text-xl mt-8'}>Agradecemos o feedback!</span>

        <button
          onClick={onFeedbackRestartRequest}
          type="button"
          className={
            'py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:border-r-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none'
          }
        >
          Quero enviar outro
        </button>
      </div>
    </>
  )
}

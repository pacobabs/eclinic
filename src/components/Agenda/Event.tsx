import { Dispatch, SetStateAction } from 'react'
import { Rendezvous } from '@models'

type Props = {
  event: Rendezvous
  setEvent: Dispatch<SetStateAction<Rendezvous>>
  setUiState: Dispatch<SetStateAction<string>>
}

const Event = ({ event, setEvent, setUiState }: Props) => {
  return (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation()
        setEvent(event)
        setUiState('edit')
      }}
      key={event.id}
      className="relative flex flex-col items-center w-full p-3 mb-1 text-sm text-white bg-blue-400 rounded-md"
    >
      <span>{event.subject}</span>
      <span>{new Date(event.date).toLocaleDateString() + '-' + new Date(event.date).toLocaleTimeString()}</span>
      <button
        onClick={() => {
          setEvent(event)
          setUiState('delete')
        }}
        className="absolute w-4 transform top-1 right-1 hover:text-blue-200 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}

export default Event

import { Dispatch, SetStateAction } from 'react'
import Event from '@components/Agenda/Event'
import { Rendezvous } from '@models'
import { defaultEvent } from '@components/Agenda/Agenda'

type Props = {
  events: Rendezvous[]
  currentDate: Date
  setEvent: Dispatch<SetStateAction<Rendezvous>>
  setUiState: Dispatch<SetStateAction<string>>
}
const Day = ({ events, currentDate, setEvent, setUiState }: Props) => {
  const dayEvents = events.filter(
    ({ date }) =>
      new Date(date).getFullYear() === currentDate.getFullYear() &&
      new Date(date).getMonth() === currentDate.getMonth() &&
      new Date(date).getDate() === currentDate.getDate()
  )
  return (
    <div className="px-2 pb-2 bg-white">
      <div className="flex h-12 bg-gray-100">
        <div className="w-16 p-2 border border-gray-100"></div>
        <div className="w-full p-2 border border-gray-100"></div>
      </div>
      {Array(24)
        .fill('')
        .map((_, index) => (
          <div className="flex" key={index}>
            <div className="w-16 p-2 border border-gray-100">{String(index).padStart(2, '0')}:00</div>
            <div
              onDoubleClick={() => {
                const date = new Date(currentDate)
                date.setHours(index)
                date.setMinutes(0)
                setEvent({ ...defaultEvent, date: date.toISOString() })
                setUiState('edit')
              }}
              className="w-full p-2 border border-gray-100 cursor-pointer"
            >
              {dayEvents
                .filter(({ date: eventDate }) => {
                  return new Date(eventDate).getHours() === index
                })
                .map((event) => (
                  <Event key={event.id} event={event} setEvent={setEvent} setUiState={setUiState} />
                ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Day

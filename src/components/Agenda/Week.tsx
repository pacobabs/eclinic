import { Dispatch, SetStateAction } from 'react'
import { Rendezvous } from '@models'
import Event from '@components/Agenda/Event'
import { defaultEvent } from '@components/Agenda/Agenda'

type Props = {
  events: Rendezvous[]
  currentDate: Date
  setEvent: Dispatch<SetStateAction<Rendezvous>>
  setUiState: Dispatch<SetStateAction<string>>
}

const Week = ({ events, currentDate, setEvent, setUiState }: Props) => {
  const isSunday = currentDate.getDay() === 0
  const firstDayOfWeek = new Date(currentDate)
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDate.getDay() + (!isSunday ? 1 : 6))
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)
  const weekEvents = events.filter(({ date }) => {
    const isSameYear = new Date(date).getFullYear() === currentDate.getFullYear()
    const isSameWeek = new Date(date) >= firstDayOfWeek && new Date(date) <= lastDayOfWeek
    return isSameYear && isSameWeek
  })
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  return (
    <div className="px-2 pb-2 bg-white">
      <div className="flex h-12 bg-gray-100">
        <div className="w-16 p-2 border border-gray-100"></div>
        <div className="grid w-full grid-cols-7 text-center">
          {days.map((day, index) => {
            const date = new Date(firstDayOfWeek)
            date.setDate(date.getDate() + index)
            return (
              <p className="p-2 border border-gray-100">
                {day} {String(date.getDate()).padStart(2, '0')}
              </p>
            )
          })}
        </div>
      </div>
      {Array(24)
        .fill('')
        .map((_, hourIndex) => (
          <div className="flex" key={hourIndex}>
            <div className="w-16 p-2 border border-gray-100">{String(hourIndex).padStart(2, '0')}:00</div>
            <div className="grid w-full grid-cols-7">
              {Array(7)
                .fill('')
                .map((_, dayIndex) => {
                  const isSameWeek = new Date() >= firstDayOfWeek && new Date() <= lastDayOfWeek
                  const isToday = isSameWeek && new Date().getDate() === firstDayOfWeek.getDate() + dayIndex
                  return (
                    <div
                      onDoubleClick={() => {
                        const date = new Date(firstDayOfWeek)
                        date.setDate(date.getDate() + dayIndex)
                        date.setHours(hourIndex)
                        date.setMinutes(0)
                        setEvent({ ...defaultEvent, date: date.toISOString() })
                        setUiState('edit')
                      }}
                      key={dayIndex}
                      className={`cursor-pointer p-2 border border-gray-100 ${isToday ? 'bg-green-50' : ''}`}
                    >
                      {weekEvents
                        .filter(({ date: eventDate }) => {
                          const sameDay = new Date(eventDate).getDate() === firstDayOfWeek.getDate() + dayIndex
                          const sameHour = new Date(eventDate).getHours() === hourIndex
                          return sameDay && sameHour
                        })
                        .map((event) => (
                          <Event key={event.id} event={event} setEvent={setEvent} setUiState={setUiState} />
                        ))}
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Week

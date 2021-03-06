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

const Month = ({ events, currentDate, setEvent, setUiState }: Props) => {
  function getWeekOfMonth(date: Date) {
    var firstDay = new Date(date)
    firstDay.setDate(1)
    var totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    return Math.ceil((firstDay.getDay() + totalDays) / 7)
  }
  const firstWeekDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() - 1
  const weeks = firstWeekDay < 0 ? getWeekOfMonth(currentDate) + 1 : getWeekOfMonth(currentDate)
  const monthEvents = events.filter(
    ({ date }) =>
      new Date(date).getFullYear() === currentDate.getFullYear() && new Date(date).getMonth() === currentDate.getMonth()
  )
  return (
    <div className="px-2 pb-2 text-gray-700 bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-10 h-10 p-3 font-normal border-r">Lundi</th>
            <th className="w-10 h-10 p-3 font-normal border-r">Mardi</th>
            <th className="w-10 h-10 p-3 font-normal border-r">Mercredi</th>
            <th className="w-10 h-10 p-3 font-normal border-r">Jeudi</th>
            <th className="w-10 h-10 p-3 font-normal border-r">Vendredi</th>
            <th className="w-10 h-10 p-3 font-normal border-r">Samedi</th>
            <th className="w-10 h-10 p-3 font-normal border-r">Dimanche</th>
          </tr>
        </thead>
        <tbody>
          {Array(weeks)
            .fill('')
            .map((_, weekIndex) => (
              <tr className="text-center h-36" key={weekIndex}>
                {Array(7)
                  .fill('')
                  .map((_, dayIndex) => {
                    const date = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      weekIndex * 7 + dayIndex - firstWeekDay + (firstWeekDay < 0 ? -6 : 1)
                    )
                    const inMonth = date.getMonth() === currentDate.getMonth()
                    const isToday = new Date().getMonth() === date.getMonth() && new Date().getDate() === date.getDate()
                    return (
                      <td
                        onDoubleClick={() => {
                          setEvent({ ...defaultEvent, date: date.toISOString() })
                          setUiState('edit')
                        }}
                        key={dayIndex}
                        className={`cursor-pointer p-1 overflow-auto border hover:bg-gray-200 ${
                          !inMonth ? 'bg-gray-100' : isToday ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="flex flex-col mx-auto overflow-hidden">
                          <div className="w-full h-5 top">
                            <span className="text-gray-500">{date.getDate()}</span>
                          </div>
                          {monthEvents
                            .filter(({ date: eventDate }) => date.getDate() === new Date(eventDate).getDate())
                            .map((event) => (
                              <Event key={event.id} event={event} setEvent={setEvent} setUiState={setUiState} />
                            ))}
                        </div>
                      </td>
                    )
                  })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Month

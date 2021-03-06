import { useState, useEffect } from 'react'
import Day from '@components/Agenda/Day'
import Week from '@components/Agenda/Week'
import Month from '@components/Agenda/Month'
import Edit from '@components/Agenda/Edit'
import Delete from '@components/Agenda/Delete'
import { DataStore } from '@aws-amplify/datastore'
import { Rendezvous, Patient } from '@models'

const VIEW = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH'
}

export const defaultEvent: Rendezvous = {
  id: '',
  subject: '',
  date: new Date().toISOString(),
  status: ''
}

const Agenda = () => {
  const [view, setView] = useState(VIEW.DAY)
  const [currenDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Rendezvous[]>([])
  const [event, setEvent] = useState<Rendezvous>(defaultEvent)
  const [patients, setPatients] = useState<Patient[]>([])
  const [uiState, setUiState] = useState('list')
  function navigate(step: number) {
    const date = new Date(currenDate)
    if (view === VIEW.DAY) {
      date.setDate(date.getDate() + step)
      setCurrentDate(date)
    }
    if (view === VIEW.WEEK) {
      date.setDate(date.getDate() + step * 7)
      setCurrentDate(date)
    }
    if (view === VIEW.MONTH) {
      date.setMonth(date.getMonth() + step)
      setCurrentDate(date)
    }
  }
  useEffect(() => {
    async function fecthEvents() {
      const events = await DataStore.query(Rendezvous)
      events && setEvents(events)
      console.log(events)
    }
    fecthEvents()
    const subscription = DataStore.observe(Rendezvous).subscribe(fecthEvents)
    return () => subscription.unsubscribe()
  }, [])
  useEffect(() => {
    async function fecthPatients() {
      const patients = await DataStore.query(Patient)
      patients && setPatients(patients)
    }
    fecthPatients()
    const subscription = DataStore.observe(Patient).subscribe(fecthPatients)
    return () => subscription.unsubscribe()
  }, [])
  if (uiState === 'edit') return <Edit rendezvous={event} patients={patients} setUiState={setUiState} />
  else if (uiState === 'delete') return <Delete event={event} setUiState={setUiState} />
  else if (uiState === 'list')
    return (
      <div className="my-2 min-w-main">
        <div className="flex flex-col max-w-full m-6 shadow-md">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <p className="text-xl font-semibold text-green-400 font-inter">Agenda</p>
            <button
              onClick={() => {
                setEvent(defaultEvent)
                setUiState('edit')
              }}
              className="flex items-center justify-between px-4 py-1 font-black text-white bg-green-400 rounded-lg shadow font-cursive dark:text-gray-200 dark:bg-green-500"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
              <span>Nouveau Rendez-vous</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between p-2 space-y-2 bg-white border-b md:space-y-0">
            <div className="flex flex-wrap items-center justify-start space-x-0 space-y-2 md:justify-end sm:space-x-2 sm:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher"
                  className="relative block w-full px-8 py-2 text-xs text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute w-4 h-4 text-green-500 left-3 bottom-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <button className="flex items-center p-2 space-x-1 text-xs font-semibold text-green-500 border border-gray-300 rounded-md shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span>Filtrer</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-white border rounded-md">
            <div className="flex gap-1 px-2 text-sm bg-gray-100 border border-gray-300 rounded-md fbg-gray-100 font-recursive">
              <button
                onClick={() => {
                  setView(VIEW.DAY)
                }}
                className={`${
                  view === VIEW.DAY ? 'bg-green-400 text-white' : ''
                } border-gray-300 border-r flex font-bold items-center my-1 px-2 py-1 rounded`}
              >
                Jour
              </button>
              <button
                onClick={() => {
                  setView(VIEW.WEEK)
                }}
                className={`${
                  view === VIEW.WEEK ? 'bg-green-400 text-white' : ''
                } border-gray-300 flex font-bold items-center my-1 px-2 py-1 rounded`}
              >
                Semaine
              </button>
              <button
                onClick={() => {
                  setView(VIEW.MONTH)
                }}
                className={`${
                  view === VIEW.MONTH ? 'bg-green-400 text-white' : ''
                } border-gray-300 border-l flex font-bold items-center my-1 px-2 py-1 rounded`}
              >
                Mois
              </button>
            </div>
            <div>
              <p className="mt-1 text-sm font-inter">{currenDate.toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 px-2 bg-gray-100 border border-gray-300 rounded-md">
              <button
                onClick={() => {
                  setCurrentDate(new Date())
                }}
                className="px-2 my-1 border-r border-gray-300"
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => {
                  navigate(-1)
                }}
                className="px-1 my-1 border-r border-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  navigate(1)
                }}
                className="px-1 my-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {view === VIEW.DAY && (
            <Day events={events} currentDate={currenDate} setEvent={setEvent} setUiState={setUiState} />
          )}
          {view === VIEW.WEEK && (
            <Week events={events} currentDate={currenDate} setEvent={setEvent} setUiState={setUiState} />
          )}
          {view === VIEW.MONTH && (
            <Month events={events} currentDate={currenDate} setEvent={setEvent} setUiState={setUiState} />
          )}
        </div>
      </div>
    )
  else return <div>loading...</div>
}

export default Agenda

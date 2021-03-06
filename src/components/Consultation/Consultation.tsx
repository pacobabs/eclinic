import { useEffect, useState } from 'react'
import { DataStore } from '@aws-amplify/datastore'
import ConsultationForm from '@components/Consultation/Edit'
import Delete from '@components/Consultation/Delete'
import { Patient, Consultation, Visit } from '@models'

export const STATUS = {
  WAITING: 'En attente',
  RUNNING: 'En cours',
  FINISHED: 'Termine'
}

const defaultConsultation: Consultation = {
  id: '',
  subject: '',
  date: new Date().toISOString(),
  status: STATUS.WAITING
}
const VisitView = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [patient, setPatient] = useState<Patient>()
  const [consultation, setConsultation] = useState<Consultation>(defaultConsultation)
  const [uiState, setUiState] = useState('list')
  useEffect(() => {
    async function fecthConsultations() {
      const consultations = await DataStore.query(Consultation)
      consultations && setConsultations(consultations)
    }
    fecthConsultations()
    const subscription = DataStore.observe(Consultation).subscribe(fecthConsultations)
    return () => subscription.unsubscribe()
  }, [])
  useEffect(() => {
    async function fecthVisits() {
      const visits = await DataStore.query(Visit)
      visits && setVisits(visits)
    }
    fecthVisits()
    const subscription = DataStore.observe(Visit).subscribe(fecthVisits)
    return () => subscription.unsubscribe()
  }, [])
  if (uiState === 'edit')
    return <ConsultationForm consultation={consultation} patient={patient} visits={visits} setUiState={setUiState} />
  else if (uiState === 'delete') return <Delete consultation={consultation} setUiState={setUiState} />
  else if (uiState === 'list')
    return (
      <div className="my-2 min-w-main">
        <div className="flex flex-col max-w-full m-6 shadow-md">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <p className="text-xl font-semibold text-green-400 font-inter">Consultations</p>
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

          <table className="w-full overflow-x-auto bg-white border border-gray-200 divide-y divide-gray-200 shadow-md">
            <thead className="text-sm text-gray-500 bg-gray-50">
              <tr className="divide-x divide-gray-300">
                <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Prenom</th>
                <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Nom</th>
                <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Motif</th>
                <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Consulte a</th>
                <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Statut</th>
                <th className="w-40 px-2 py-2 font-bold text-right text-green-500 font-cursive">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-900 divide-y divide-gray-200 font-inter">
              {consultations.map((consultation) => {
                return (
                  <tr className="text-left" key={consultation.id}>
                    <td className="px-2 py-2 font-bold">{consultation.Patient?.firstname}</td>
                    <td className="px-2 py-2 font-bold">{consultation.Patient?.lastname}</td>
                    <td className="px-2 py-2 font-bold text-green-500">{consultation.subject}</td>
                    <td className="px-2 py-2 text-right">
                      {consultation.date
                        ? new Date(consultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''}
                    </td>
                    <td className="px-2 py-2 text-sm text-right font-crimson">
                      <span
                        className={` inline-flex w-20 justify-center px-2 py-1 font-semibold rounded-md text-green-50 ${
                          consultation.status === STATUS.WAITING
                            ? 'bg-gray-200 text-green-800'
                            : consultation.status === STATUS.RUNNING
                            ? 'bg-green-600'
                            : 'bg-gray-400'
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-end text-sm item-center font-crimson">
                        {consultation.status !== STATUS.FINISHED && (
                          <button
                            onClick={async () => {
                              const status = consultation.status === STATUS.WAITING ? STATUS.RUNNING : STATUS.FINISHED
                              await DataStore.save(
                                Consultation.copyOf(consultation, (newConsultation) => {
                                  newConsultation.status = status
                                  newConsultation.date = new Date().toISOString()
                                })
                              )
                              const visit = visits.find(({ Consultation }) => Consultation?.id === consultation.id)
                              visit &&
                                (await DataStore.save(
                                  Visit.copyOf(visit, (newVisit) => {
                                    newVisit.status = status
                                  })
                                ))
                            }}
                            className={`${
                              consultation.status === STATUS.WAITING
                                ? 'bg-green-400 hover:bg-green-500 text-green-50'
                                : 'bg-yellow-200 hover:bg-yellow-300 text-gray-800'
                            } font-bold font-cursive mr-2 px-2 py-2 rounded-md text-center text-xs w-20`}
                          >
                            {consultation.status === STATUS.WAITING ? 'Demarrer' : 'Terminer'}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setPatient(consultation.Patient)
                            setConsultation(consultation)
                            setUiState('edit')
                          }}
                          className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setConsultation(consultation)
                            setUiState('delete')
                          }}
                          className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
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
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  else return <div>loading...</div>
}

export default VisitView

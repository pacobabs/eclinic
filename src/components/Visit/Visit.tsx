import { useEffect, useState } from 'react'
import { DataStore } from '@aws-amplify/datastore'
import VisitForm from '@components/Visit/Edit'
import Delete from '@components/Visit/Delete'
import PatientForm from '@components/Patient/Edit'
import { Patient, Visit } from '@models'

export const STATUS = {
  WAITING: 'En attente',
  RUNNING: 'En cours',
  FINISHED: 'Termine'
}

const defaultVisit: Visit = { id: '', subject: '', arrivalTime: new Date().toISOString(), status: STATUS.WAITING }
const defaultPatient: Patient = { id: '', firstname: '', lastname: '', gender: 'male' }

const VisitView = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [visit, setVisit] = useState<Visit>(defaultVisit)
  const [uiState, setUiState] = useState('list')
  useEffect(() => {
    async function fecthVisits() {
      const visits = await DataStore.query(Visit)
      visits && setVisits(visits)
    }
    fecthVisits()
    const subscription = DataStore.observe(Visit).subscribe(fecthVisits)
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
  if (uiState === 'edit' || uiState === 'edit-patient')
    return <VisitForm visit={visit} patients={patients} setUiState={setUiState} />
  else if (uiState === 'new') return <VisitForm visit={visit} patients={patients} setUiState={setUiState} />
  else if (uiState === 'delete') return <Delete visit={visit} setUiState={setUiState} />
  else if (uiState === 'new-patient')
    return <PatientForm patient={defaultPatient} setUiState={() => setUiState('edit')} />
  else if (uiState === 'list')
    return (
      <div className="my-2 min-w-main">
        <div className="flex flex-col max-w-full m-6 shadow-md">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <p className="text-xl font-semibold text-green-400 font-inter">Salle d'attente</p>
            <button
              onClick={() => {
                setVisit(defaultVisit)
                setUiState('new')
              }}
              className="flex items-center justify-between px-4 py-1 font-black text-white bg-green-400 rounded-lg shadow font-cursive dark:text-gray-200 dark:bg-green-500"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
              <span>Nouvelle Visite</span>
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

          <table className="w-full overflow-x-auto bg-white border border-gray-200 divide-y divide-gray-200 shadow-md">
            <thead className="text-sm text-gray-500 bg-gray-50">
              <tr className="divide-x divide-gray-300">
                <th className="w-12 px-2 py-2 font-bold text-right text-green-500 font-cursive">Numero</th>
                <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Prenom</th>
                <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Nom</th>
                <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Motif</th>
                <th className="px-2 py-2 text-xs font-bold text-right text-green-500 font-cursive">Contact</th>
                <th className="px-2 py-2 text-xs font-bold text-right text-green-500 font-cursive">Arrive a</th>
                <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Consulte a</th>
                <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Statut</th>
                <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-900 divide-y divide-gray-200 font-inter">
              {visits.map((visit, index) => {
                return (
                  <tr className="text-left" key={visit.id}>
                    <td className="px-2 py-2 font-bold text-right">{index + 1}</td>
                    <td className="px-2 py-2 font-bold">{visit.Patient?.firstname}</td>
                    <td className="px-2 py-2 font-bold">{visit.Patient?.lastname}</td>
                    <td className="px-2 py-2 font-bold">{visit.subject}</td>
                    <td className="px-2 py-2 text-right">{visit.Patient?.contact || visit.Patient?.email}</td>
                    <td className="px-2 py-2 font-bold text-right text-green-500">
                      {visit.arrivalTime
                        ? new Date(visit.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''}
                    </td>
                    <td className="px-2 py-2 text-right">
                      {visit.visitTime
                        ? new Date(visit.visitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''}
                    </td>
                    <td className="px-2 py-2 text-sm text-right font-crimson">
                      <span
                        className={` inline-flex w-20 justify-center px-2 py-1 font-semibold rounded-md text-green-50 ${
                          visit.status === STATUS.WAITING
                            ? 'bg-gray-200 text-green-800'
                            : visit.status === STATUS.RUNNING
                            ? 'bg-green-600'
                            : 'bg-gray-400'
                        }`}
                      >
                        {visit.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-end item-center">
                        <button
                          onClick={() => {
                            setVisit(visit)
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
                            setVisit(visit)
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

import { useState, Dispatch, SetStateAction } from 'react'
import { Consultation, Visit, Patient } from '@models'
import { DataStore } from 'aws-amplify'
import { STATUS } from './Visit'

type Props = {
  visit: Visit
  patients: Patient[]
  setUiState: Dispatch<SetStateAction<string>>
}

const Edit = ({ visit, patients, setUiState }: Props) => {
  const [subject, setSubject] = useState(visit.subject || '')
  const [status, setStatus] = useState(visit.status || '')
  const [arrivalTime, setArrivalTime] = useState(visit.arrivalTime || '')
  const [visitTime, setVisitTime] = useState(visit.visitTime || '')
  const [patient, setPatient] = useState(visit.Patient)
  return (
    <div className="my-2 min-w-main">
      <div className="flex flex-col max-w-full m-6 shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <p className="text-xl font-semibold text-green-400 font-inter">
            {visit.id ? 'Modifier Visite' : 'Nouvelle Visite'}
          </p>
        </div>
        <form className="p-6 text-sm bg-white">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="patient">
                Patient
              </label>
              <input
                disabled
                value={patient ? `${patient?.firstname} ${patient?.lastname}` : ''}
                name="patient"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="subject">
                Motif
              </label>
              <input
                autoFocus
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                name="subject"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            {!visit.id && (
              <div>
                <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="arrival">
                  Heure d'arrivee
                </label>
                <input
                  value={`${String(new Date(arrivalTime).getHours()).padStart(2, '0')}:${String(
                    new Date(arrivalTime).getMinutes()
                  ).padStart(2, '0')}`}
                  onChange={(e) => {
                    const date = new Date(arrivalTime)
                    const time = e.target.value.split(':')
                    const hour = Number(time[0])
                    const minute = time.length === 2 ? Number(time[1]) : 0
                    setArrivalTime(() =>
                      new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute).toISOString()
                    )
                  }}
                  name="arrival"
                  type="time"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            )}
            {visit.id && (
              <div>
                <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="time">
                  Heure de consultation
                </label>
                <input
                  value={`${String(new Date(visitTime).getHours()).padStart(2, '0')}:${String(
                    new Date(visitTime).getMinutes()
                  ).padStart(2, '0')}`}
                  onChange={(e) => {
                    const date = new Date(arrivalTime)
                    const time = e.target.value.split(':')
                    const hour = Number(time[0])
                    const minute = time.length === 2 ? Number(time[1]) : 0
                    setVisitTime(() =>
                      new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute).toISOString()
                    )
                  }}
                  name="time"
                  type="time"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="gender">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 pt-2 pb-3 mt-2 text-gray-600 bg-white border border-gray-400 rounded shadow-inner"
              >
                <option value={STATUS.WAITING}>{STATUS.WAITING}</option>
                <option value={STATUS.RUNNING}>{STATUS.RUNNING}</option>
                <option value={STATUS.FINISHED}>{STATUS.FINISHED}</option>
              </select>
            </div>
          </div>
          {!visit.id && (
            <>
              <div className="flex justify-end gap-2 pb-1 mt-8 mb-2">
                <a
                  onClick={() => setUiState('new-patient')}
                  className="px-2 py-1 text-xs font-semibold text-green-800 border border-gray-300 rounded-md bg-green-50"
                >
                  Nouveau Patient
                </a>
              </div>
              <table className="w-full overflow-x-auto bg-white border border-gray-200 divide-y divide-gray-200 shadow-md">
                <thead className="text-sm text-gray-500 bg-gray-50">
                  <tr className="divide-x divide-gray-300">
                    <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Prenom</th>
                    <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Nom</th>
                    <th className="px-2 py-2 text-xs font-bold text-left text-green-500 font-cursive">Sexe</th>
                    <th className="px-2 py-2 text-xs font-bold text-left text-green-500 font-cursive">Adresse</th>
                    <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Email</th>
                    <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Telephone</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-900 divide-y divide-gray-200">
                  {patients.map((p) => (
                    <tr
                      className={`text-left cursor-pointer ${
                        p.id === patient?.id ? 'bg-green-100' : 'hover:bg-green-50'
                      }`}
                      key={p.id}
                      onClick={() => {
                        setPatient(p)
                      }}
                    >
                      <td className="px-2 py-2 font-bold">{p.firstname}</td>
                      <td className="px-2 py-2 font-bold">{p.lastname}</td>
                      <td className="px-2 py-2">{p.gender === 'male' ? 'M' : 'F'}</td>
                      <td className="px-2 py-2">{p.address}</td>
                      <td className="px-2 py-2">{p.email}</td>
                      <td className="px-2 py-2 text-right">{p.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="w-full pr-2 mt-3 text-xs text-right text-gray-600 font-inter">
                Cliquez sur un patient pour selectionner
              </p>
            </>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <a
              onClick={() => setUiState('list')}
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Annuler
            </a>
            <a
              onClick={async () => {
                if (!visit.id) {
                  const consultation = await DataStore.save(
                    new Consultation({
                      subject,
                      status: status,
                      Patient: patient
                    })
                  )
                  await DataStore.save(
                    new Visit({
                      subject,
                      arrivalTime: arrivalTime,
                      visitTime: visitTime ? visitTime : undefined,
                      status: status,
                      Patient: patient,
                      Consultation: consultation
                    })
                  )
                } else {
                  await DataStore.save(
                    Visit.copyOf(visit, (newVisit) => {
                      newVisit.subject = subject
                      newVisit.status = status
                      patient && (newVisit.Patient = patient)
                      newVisit.arrivalTime = arrivalTime
                      visitTime && (newVisit.visitTime = visitTime)
                    })
                  )
                  visit.Consultation &&
                    (await DataStore.save(
                      Consultation.copyOf(visit.Consultation, (newConsultation) => {
                        newConsultation.subject = subject
                        newConsultation.status = status
                        visitTime && (newConsultation.date = visitTime)
                      })
                    ))
                }
                setUiState('list')
              }}
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {visit.id ? 'Modifier' : 'Ajouter'}
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit

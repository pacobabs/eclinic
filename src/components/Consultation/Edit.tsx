import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Consultation, Patient, Visit } from '@models'
import { DataStore } from 'aws-amplify'
import { STATUS } from './Consultation'

type Props = {
  patient?: Patient
  consultation: Consultation
  visits: Visit[]
  setUiState: Dispatch<SetStateAction<string>>
}

const Edit = ({ consultation, patient, visits, setUiState }: Props) => {
  const [subject, setSubject] = useState('')
  const [status, setStatus] = useState(consultation.status || '')
  const [exam, setExam] = useState(consultation.exam || '')
  const [diagnosis, setDiagnosis] = useState(consultation.diagnosis || '')
  const [treatment, setTreatment] = useState(consultation.treatment || '')
  const [prescription, setPrescription] = useState(consultation.prescription || '')
  const [date, setDate] = useState(consultation.date || new Date().toISOString())
  useEffect(() => {
    setStatus(consultation.status || '')
    setSubject(consultation.subject || '')
  }, [consultation.subject, consultation.status])
  return (
    <div className="my-2 min-w-main">
      <div className="flex flex-col max-w-full m-6 shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <p className="text-xl font-semibold text-green-400 font-inter">Consultation</p>
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
            <div>
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="arrival">
                Heure de consultation
              </label>
              <input
                value={`${String(new Date(date).getHours()).padStart(2, '0')}:${String(
                  new Date(date).getMinutes()
                ).padStart(2, '0')}`}
                onChange={(e) => {
                  const newDate = new Date(date)
                  const time = e.target.value.split(':')
                  const hour = Number(time[0])
                  const minute = time.length === 2 ? Number(time[1]) : 0
                  setDate(() =>
                    new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), hour, minute).toISOString()
                  )
                }}
                name="arrival"
                type="time"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

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
          <div className="grid grid-cols-1 gap-4 mt-8 gap-y-8 sm:grid-cols-2">
            <div>
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="examen">
                Examen
              </label>
              <textarea
                rows={4}
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                name="examen"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="diagnosis">
                Diagnostic
              </label>
              <textarea
                rows={4}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                name="diagnosis"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="treatment">
                Traitement
              </label>
              <textarea
                rows={4}
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                name="treatment"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="prescription">
                Prescription
              </label>
              <textarea
                rows={4}
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                name="prescription"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <a
              onClick={() => setUiState('list')}
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Annuler
            </a>
            <a
              onClick={async () => {
                if (!consultation.id) {
                  await DataStore.save(
                    new Consultation({
                      subject,
                      date,
                      exam,
                      diagnosis,
                      treatment,
                      prescription,
                      status: status,
                      Patient: patient
                    })
                  )
                } else {
                  const visit = visits.find(({ Consultation }) => Consultation?.id === consultation.id)
                  visit &&
                    (await DataStore.save(
                      Visit.copyOf(visit, (newVisit) => {
                        newVisit.status = status
                        newVisit.visitTime = date
                      })
                    ))
                  await DataStore.save(
                    Consultation.copyOf(consultation, (newConsultation) => {
                      newConsultation.subject = subject
                      newConsultation.status = status
                      newConsultation.date = date
                      newConsultation.exam = exam
                      newConsultation.diagnosis = diagnosis
                      newConsultation.treatment = treatment
                      newConsultation.prescription = prescription
                    })
                  )
                }
                setUiState('list')
              }}
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Enregistrer
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit

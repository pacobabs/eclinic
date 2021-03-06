import { useState, Dispatch, SetStateAction } from 'react'
import { Patient } from '@models'
import { DataStore } from 'aws-amplify'
import DatePicker from 'react-datepicker'

type Props = {
  patient: Patient
  setUiState: Dispatch<SetStateAction<string>>
}

const Edit = ({ patient, setUiState }: Props) => {
  const [firstname, setFirstname] = useState(patient.firstname || '')
  const [lastname, setLastname] = useState(patient.lastname || '')
  const [gender, setGender] = useState(patient.gender || 'male')
  const [age, setAge] = useState(patient.age || 0)
  const [birthdate, setBirthdate] = useState(patient.birthdate || new Date().toISOString().split('T')[0])
  const [address, setAddress] = useState(patient.address || '')
  const [email, setEmail] = useState(patient.email || '')
  const [contact, setContact] = useState(patient.contact || '')
  return (
    <div className="my-2 min-w-main">
      <div className="flex flex-col max-w-full m-6 shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <p className="text-xl font-semibold text-green-400 font-inter">
            {patient.id ? 'Modifier Patient' : 'Nouveau Patient'}
          </p>
        </div>
        <form className="p-6 text-sm bg-white">
          <h1 className="mt-4 text-lg font-bold text-green-400 font-cursive">Informations personnelles</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="firstname">
                Prenom
              </label>
              <input
                autoFocus
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                name="firstname"
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="lastname">
                Nom
              </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                name="lastname"
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="gender">
                Sexe
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 pt-2 pb-3 mt-2 text-gray-600 bg-white border border-gray-400 rounded shadow-inner"
              >
                <option value="male">M</option>
                <option value="female">F</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="address">
                Adresse
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="email">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="contact">
                Telephone
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                name="contact"
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="birthdate">
                Date de naissance
              </label>
              <DatePicker
                name="birthdate"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                selected={new Date(birthdate)}
                onChange={(date: Date) => {
                  date && setBirthdate(date.toISOString().split('T')[0])
                  date &&
                    setAge(
                      Math.max(
                        0,
                        Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 365))
                      )
                    )
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="pl-4 font-bold text-green-400 dark:text-gray-200" htmlFor="age">
                Age
              </label>
              <input
                value={age}
                name="age"
                type="number"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => {
                  setBirthdate(
                    new Date(`01-01-${new Date().getFullYear() - Number(e.target.value)}`).toISOString().split('T')[0]
                  )
                  setAge(() => Number(e.target.value))
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <a
              onClick={() => setUiState('list')}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-400 rounded-md font-cursive hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
            >
              Annuler
            </a>
            <a
              onClick={async () => {
                if (!patient.id) {
                  await DataStore.save(
                    new Patient({
                      firstname,
                      lastname,
                      gender,
                      address,
                      contact,
                      email,
                      birthdate,
                      age
                    })
                  )
                } else {
                  await DataStore.save(
                    Patient.copyOf(patient, (newPatient) => {
                      newPatient.firstname = firstname
                      newPatient.lastname = lastname
                      newPatient.gender = gender
                      newPatient.address = address
                      newPatient.contact = contact
                      newPatient.email = email
                      newPatient.birthdate = birthdate
                      newPatient.age = age
                    })
                  )
                }
                setUiState('list')
              }}
              className="px-6 py-2 font-bold leading-5 text-white transition-colors duration-200 transform bg-green-400 rounded-md font-cursive hover:bg-green-500 focus:outline-none focus:bg-green-500"
            >
              {patient.id ? 'Modifier' : 'Ajouter'}
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit

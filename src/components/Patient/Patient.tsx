import { Dispatch, SetStateAction } from 'react'
import { Patient } from '@models'

type Props = {
  patient: Patient
  setUiState: Dispatch<SetStateAction<string>>
}

const PatientView = ({
  patient: { firstname, lastname, gender, address, birthdate, age, contact, email },
  setUiState
}: Props) => {
  return (
    <div className="bg-gray-100">
      <div className="container p-5 mx-auto my-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="p-3 bg-white border-t-4 border-green-400">
              <div className="flex items-center justify-center w-full h-64 mx-auto bg-gray-100">
                <p className="text-gray-400">Upload photo</p>
              </div>
              <h1 className="my-1 text-xl font-bold leading-8 text-gray-900 capitalize">
                {firstname} {lastname}
              </h1>
              <h3 className="leading-6 text-gray-600 font-lg text-semibold">Sexe {gender === 'male' ? 'M' : 'F'}</h3>
              <ul className="px-3 py-2 mt-3 text-gray-600 bg-gray-100 divide-y rounded shadow-sm hover:text-gray-700 hover:shadow">
                <li className="flex items-center py-3">
                  <span>Documents</span>
                  <span className="ml-auto">
                    <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">Upload</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-64 mx-2 md:w-9/12">
            <div className="p-3 bg-white border-t-4 border-green-400 rounded-sm shadow-sm">
              <div className="flex justify-end">
                <button onClick={() => setUiState('list')}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-8 h-8 font-semibold text-green-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="text-lg font-bold tracking-wide text-green-400 font-cursive font-recursive">
                  Informations personnelles
                </span>
              </div>
              <div className="font-semibold text-gray-900">
                <div className="grid text-sm md:grid-cols-2">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Prenom</div>
                    <div className="px-4 py-2">{firstname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Nom</div>
                    <div className="px-4 py-2">{lastname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Sexe</div>
                    <div className="px-4 py-2">{gender === 'male' ? 'M' : 'F'}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Telephone</div>
                    <div className="px-4 py-2">{contact}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Adresse</div>
                    <div className="px-4 py-2">{address}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Email</div>
                    <div className="px-4 py-2">{email}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Date de naissance</div>
                    <div className="px-4 py-2">{birthdate}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 text-green-500">Age</div>
                    <div className="px-4 py-2">{age === 0 ? '' : age}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setUiState('edit')}
                className="block w-full p-3 my-4 text-sm font-semibold text-green-600 rounded-lg font-cursive font-recursive hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs"
              >
                Modifier patient
              </button>
            </div>

            <div className="p-3 mt-4 bg-white border-t-4 border-green-400 rounded-sm shadow-sm">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center mb-3 space-x-2 font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="text-lg font-bold tracking-wide text-green-400 font-cursive font-recursive">
                      Consultations
                    </span>
                  </div>
                  <ul className="space-y-2 list-inside">
                    <li>
                      <div className="text-teal-600">Exemple consultation</div>
                      <div className="text-xs text-gray-500">20 Mars 2020</div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center mb-3 space-x-2 font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="text-lg font-bold tracking-wide text-green-400 font-cursive font-recursive">
                      Prescriptions
                    </span>
                  </div>
                  <ul className="space-y-2 list-inside">
                    <li>
                      <div className="text-teal-600">Exemple prescription</div>
                      <div className="text-xs text-gray-500">25 Mars 2020</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-3 mt-4 bg-white border-t-4 border-green-400 rounded-sm shadow-sm">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center mb-3 space-x-2 font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="text-lg font-bold tracking-wide text-green-400 font-cursive font-recursive">
                      Allergies et antecedents
                    </span>
                  </div>
                  <ul className="space-y-2 list-inside">
                    <li>
                      <div className="text-teal-600">Exemple allergie</div>
                      <div className="text-xs text-gray-500">20 Mars 2020</div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center mb-3 space-x-2 font-semibold leading-8 text-gray-900">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="text-lg font-bold tracking-wide text-green-400 font-cursive font-recursive">
                      Observations
                    </span>
                  </div>
                  <ul className="space-y-2 list-inside">
                    <li>
                      <div className="text-teal-600">Exemple observation</div>
                      <div className="text-xs text-gray-500">25 Mars 2020</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientView

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Auth, API } from 'aws-amplify'
import { addUserToGroup, removeUserFromGroup, confirmUserSignUp, enableUser, disableUser } from '@services'

type User = {
  email: string
  type: 'admin' | 'editor'
  status: string
  createdDate: Date
  lastmodified: Date
  active: boolean
}

function formatDate(date: Date) {
  return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [reload, setReload] = useState(false)
  async function listUsersByGroup(groupname: string) {
    try {
      const result = await API.get('AdminQueries', '/listUsersInGroup', {
        queryStringParameters: {
          groupname
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
      })
      return result.Users.map(({ Attributes, Enabled, UserCreateDate, UserLastModifiedDate, UserStatus }: any) => ({
        email: Attributes[2].Value,
        type: groupname,
        status: UserStatus,
        createdDate: UserCreateDate,
        lastmodified: UserLastModifiedDate,
        active: Enabled
      }))
    } catch {
      return []
    }
  }
  async function listUsers() {
    const admins = await listUsersByGroup('admin')
    const editors = await listUsersByGroup('editor')
    setUsers([...admins, ...editors])
  }
  useEffect(() => {
    listUsers()
  }, [reload])
  return (
    <div className="my-2 min-w-main">
      <div className="flex flex-col max-w-full m-6 shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <p className="text-xl font-semibold text-green-400 font-inter">Utilisateurs</p>
          <Link href="/signup">
            <a className="flex items-center justify-between px-4 py-1 font-black text-white bg-green-400 rounded-lg shadow font-cursive dark:text-gray-200 dark:bg-green-500">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
              <span>Nouveau Compte</span>
            </a>
          </Link>
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
          </div>
        </div>

        <table className="w-full overflow-x-auto bg-white divide-y divide-gray-200 shadow-md">
          <thead className="text-sm text-green-500 bg-gray-50">
            <tr className="divide-x divide-gray-300">
              <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Email</th>
              <th className="px-2 py-2 font-bold text-left text-green-500 font-cursive">Role</th>
              <th className="px-2 py-2 text-xs font-bold text-left text-green-500 font-cursive">Statut</th>
              <th className="px-2 py-2 text-xs font-bold text-left text-green-500 font-cursive">Activite</th>
              <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Date de creation</th>
              <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Date de modification</th>
              <th className="px-2 py-2 font-bold text-right text-green-500 font-cursive">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 tet-gray-900">
            {users
              .sort((a, b) => a.type.localeCompare(b.type))
              .map(({ email, active, type, status, createdDate, lastmodified }) => (
                <tr className="text-sm" key={email}>
                  <td className="px-2 py-2 font-bold">{email}</td>
                  <td className="px-2 py-2 font-bold text-green-400">{type}</td>
                  <td className="px-2 py-2">
                    <span
                      className={`px-2 py-1 font-semibold rounded-md text-green-50 ${
                        status === 'CONFIRMED' ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <span
                      className={`px-2 py-1 font-semibold rounded-md text-green-50 ${
                        active ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      {active ? 'Active' : 'Desactive'}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-right">{formatDate(createdDate)}</td>
                  <td className="px-2 py-2 text-right">{formatDate(lastmodified)}</td>
                  <td className="px-2">
                    <div className="flex justify-end item-center">
                      <div className="">
                        <button
                          className={`text-xs px-2 w-14 font-bold ${
                            type === 'editor' ? 'bg-gray-700' : 'bg-red-500'
                          } rounded-md text-green-50 font-cursive`}
                          onClick={async () => {
                            if (type === 'editor') {
                              await removeUserFromGroup(email, 'editor')
                              await addUserToGroup(email, 'admin')
                            } else {
                              await removeUserFromGroup(email, 'admin')
                              await addUserToGroup(email, 'editor')
                            }
                            setReload(!reload)
                          }}
                        >
                          {type === 'editor' ? 'Admin' : 'Editeur'}
                        </button>
                        <button
                          className={`px-2 ml-2 text-xs w-20 font-bold ${
                            active ? 'bg-red-600' : 'bg-green-500'
                          } rounded-md text-green-50 font-cursive`}
                          onClick={async () => {
                            if (active) {
                              await disableUser(email)
                            } else {
                              await enableUser(email)
                            }
                            setReload(!reload)
                          }}
                        >
                          {active ? 'Desactiver' : 'Activer'}
                        </button>

                        {status !== 'CONFIRMED' && (
                          <button
                            className="px-2 ml-2 text-xs font-bold bg-green-500 rounded-md hover:bg-green-600 text-green-50 font-cursive"
                            onClick={async () => {
                              await confirmUserSignUp(email)
                              setReload(!reload)
                            }}
                          >
                            Confirmer
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users

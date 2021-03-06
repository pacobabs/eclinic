import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
  path: string
  user?: User
}

type User = {
  signInUserSession: {
    accessToken: {
      payload: {
        ['cognito:groups']: 'admin' | 'editor'
      }
    }
  }
  attributes: {
    email: string
  }
}

const Navbar = ({ user, path }: Props) => {
  const router = useRouter()
  async function signOut() {
    await Auth.signOut()
    router.push('/login')
  }
  const admin = user?.signInUserSession.accessToken.payload['cognito:groups'].includes('admin')
  return (
    <nav className="flex flex-col px-4 pb-2 bg-gray-200 dark:bg-gray-900">
      <p className="flex pt-2 text-2xl font-bold text-green-300 font-cursive font-recursive">e-clinic</p>

      <h1 className="mt-8 text-2xl font-bold text-green-400 font-casual font-cursive">Gestion</h1>

      <ul>
        <li
          className={`py-2 pr-4 mt-4 -ml-2 dark:bg-gray-200 ${
            path === 'dashboard' ? 'bg-white rounded-lg shadow' : ''
          }`}
        >
          <Link href="/">
            <a className="flex pl-2">
              <svg className="w-5 h-5 text-green-400 fill-current dark:text-gray-300" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              <span className="ml-2 text-sm text-green-900 capitalize dark:text-gray-300 font-inter">
                Tableau de bord
              </span>
            </a>
          </Link>
        </li>

        <li className={`py-2 pr-4 mt-4 -ml-2 dark:bg-gray-200 ${path === 'visit' ? 'bg-white rounded-lg shadow' : ''}`}>
          <Link href="/visit">
            <a className="flex pl-2">
              <svg className="w-5 h-5 text-green-400 fill-current dark:text-gray-300" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
              </svg>
              <span className="ml-2 text-sm text-green-900 capitalize dark:text-gray-300 font-inter">
                Salle d'attente
              </span>
            </a>
          </Link>
        </li>

        <li
          className={`py-2 pr-4 mt-4 -ml-2 dark:bg-gray-200 ${path === 'agenda' ? 'bg-white rounded-lg shadow' : ''}`}
        >
          <Link href="/agenda">
            <a className="flex pl-2">
              <svg className="w-5 h-5 text-green-400 fill-current dark:text-gray-300" viewBox="0 0 24 24">
                <path
                  d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
							00-2-2h-1V1m-1 11h-5v5h5v-5z"
                ></path>
              </svg>
              <span className="ml-2 text-sm text-green-900 capitalize dark:text-gray-300 font-inter">Agenda</span>
            </a>
          </Link>
        </li>

        <li
          className={`py-2 pr-4 mt-4 -ml-2 dark:bg-gray-200 ${path === 'patients' ? 'bg-white rounded-lg shadow' : ''}`}
        >
          <Link href="/patients">
            <a href="#home" className="flex pl-2">
              <svg className="w-5 h-5 text-green-400 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
							014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
							8-4z"
                ></path>
              </svg>
              <span className="ml-2 text-sm capitalize font-inter">Dossier Medical</span>
            </a>
          </Link>
        </li>

        <li
          className={`py-2 pr-4 mt-4 -ml-2 dark:bg-gray-200 ${
            path === 'consultation' ? 'bg-white rounded-lg shadow' : ''
          }`}
        >
          <Link href="/consultation">
            <a href="#home" className="flex pl-2">
              <svg className="w-5 h-5 text-green-400 fill-current dark:text-gray-300" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
              </svg>
              <span className="ml-2 text-sm text-green-900 capitalize dark:text-gray-300 font-inter">Consultation</span>
            </a>
          </Link>
        </li>
      </ul>

      <h1 className="mt-8 text-2xl font-bold text-green-400 font-casual font-cursive">Administration</h1>
      <ul>
        <li className="mt-4 -ml-2">
          <a href="#home" className="flex pl-2">
            <svg className="w-5 h-5 text-green-400 fill-current dark:text-gray-300" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
            <span className="ml-2 text-sm text-green-900 capitalize dark:text-gray-300 font-inter">Parametrage</span>
          </a>
        </li>
        {admin && (
          <li
            className={`py-2 pr-4 mt-4 -ml-2 dark:bg-gray-200 ${path === 'users' ? 'bg-white rounded-lg shadow' : ''}`}
          >
            <Link href="/users">
              <a className="flex pl-2">
                <svg className="w-5 h-5 text-green-400 fill-current dark:text-gray-300" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
                <span className="ml-2 text-sm text-green-900 capitalize dark:text-gray-300 font-inter">
                  Utilisateurs
                </span>
              </a>
            </Link>
          </li>
        )}
      </ul>

      <div className="flex items-center mt-auto text-gray-900 dark:text-gray-400">
        <button onClick={signOut} className="flex items-center">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path
              d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
						2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
						0 012-2h9z"
            ></path>
          </svg>
          <span className="ml-2 capitalize">Déconnection</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar

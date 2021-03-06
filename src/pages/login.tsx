import { useState } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import Link from 'next/link'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function signIn() {
    try {
      await Auth.signIn(email, password)
      router.push('/')
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-12">
          <h2 className="text-3xl font-medium mb-12 text-center text-green-400 dark:text-white">
            Connectez-vous a votre compte
          </h2>
          <form>
            <div className="w-full mt-4">
              <label className="text-green-400 font-inter" htmlFor="email">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
              />
            </div>
            <div className="w-full mt-4">
              <label className="text-green-400 font-inter" htmlFor="current-password">
                Mot de passe
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="password"
                placeholder="Mot de passe"
                name="current-password"
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={signIn}
                className="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-400 rounded hover:bg-green-500 focus:outline-none"
                type="button"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
          <Link href="/password">
            <a className="mx-2 text-sm font-bold text-green-400 dark:text-blue-400 hover:text-green-500">
              Mot de passe oublie ?
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

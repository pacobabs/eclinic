import { useState } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [password, setPassword] = useState('')
  const [uiState, setUiState] = useState('')
  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email)
      setUiState('submit')
    } catch (err) {
      console.log({ err })
    }
  }
  async function forgotPasswordSubmit() {
    try {
      await Auth.forgotPasswordSubmit(email, authCode, password)
      router.push('/login')
    } catch (err) {
      console.log({ err })
    }
  }
  return uiState === 'submit' ? (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-12">
          <h2 className="mb-12 text-3xl font-medium text-center text-green-400 dark:text-white">
            Creez un nouveau mot de passe
          </h2>
          <form>
            <div className="w-full mt-4">
              <label className="text-green-400 font-inter" htmlFor="code">
                Code de confirmation
              </label>
              <input
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                name="code"
                placeholder="Code de confirmation"
              />
            </div>
            <div className="w-full mt-4">
              <label className="text-green-400 font-inter" htmlFor="new-password">
                Nouveau mot de passe
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="password"
                placeholder="Nouveau mot de passe"
                name="new-password"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={forgotPasswordSubmit}
                className="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-400 rounded hover:bg-green-500 focus:outline-none"
                type="button"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700"></div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-12">
          <h2 className="mb-12 text-3xl font-medium text-center text-green-400 dark:text-white">
            Changez votre mot de passe
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
                placeholder="Email"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={forgotPassword}
                className="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-400 rounded hover:bg-green-500 focus:outline-none"
                type="button"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}

export default ForgotPassword

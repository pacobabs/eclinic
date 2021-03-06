import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@components/Navbar/Navbar'

import { Auth } from 'aws-amplify'

type Props = {
  path: string
  children: ReactNode
}

const App = ({ path, children }: Props) => {
  const [user, setUser] = useState()
  const router = useRouter()
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch (err) {
        router.push('/login')
      }
    }
    checkAuth()
  })
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {user && (
        <>
          <Navbar user={user} path={path} />
          <main className="flex flex-col flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-700">{children}</main>{' '}
        </>
      )}
    </div>
  )
}

export default App

import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className="my-2 min-w-main">
      <div className="flex flex-col items-center max-w-full m-6">
        <div className="flex items-center justify-center h-full px-8 py-8 shadow-xl bg-gray-50">
          <div className="grid grid-cols-2 gap-8 ">
            <Link href="/visit">
              <a className="flex flex-col items-center justify-center h-full p-8 text-lg text-pink-600 bg-pink-100 rounded-2xl font-inter">
                <svg className="w-6 h-6 mb-2 fill-current dark:text-gray-300" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                </svg>
                <p className="mb-6 font-mono text-2xl font-black font-recursive font-casual">Visites</p>
                <span className="mb-2 text-6xl text-pink-500">8</span>patients en attente
              </a>
            </Link>
            <Link href="/agenda">
              <a className="flex flex-col items-center justify-center h-full p-8 text-lg text-green-600 bg-green-100 rounded-2xl font-inter">
                <svg className="w-8 h-8 fill-current dark:text-gray-300" viewBox="0 0 24 24">
                  <path
                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
							00-2-2h-1V1m-1 11h-5v5h5v-5z"
                  ></path>
                </svg>
                <p className="mb-6 font-mono text-2xl font-black font-recursive font-casual">Agenda</p>
                <span className="mb-2 text-6xl text-green-600">6</span>rendez-vous prevus
              </a>
            </Link>
            <Link href="/consultation">
              <a className="flex flex-col items-center justify-center h-full p-8 text-lg text-green-600 bg-gray-100 rounded-2xl font-inter">
                <svg className="w-6 h-6 mb-2 fill-current dark:text-gray-300" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
                <p className="mb-6 font-mono text-2xl font-black font-recursive font-casual">Consultations</p>
                <span className="mb-2 text-6xl text-green-500">2</span>patients en consultation
              </a>
            </Link>
            <Link href="/patients">
              <a className="flex flex-col items-center justify-center h-full p-8 text-lg text-pink-500 bg-gray-100 rounded-2xl font-inter">
                <svg className="fill-current w-7 h-7" viewBox="0 0 24 24">
                  <path
                    d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
							014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
							8-4z"
                  ></path>
                </svg>
                <p className="mb-6 font-mono text-2xl font-black font-recursive font-casual">Patients</p>
                <span className="mb-2 text-6xl text-pink-600">2363</span>patients enregistres
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

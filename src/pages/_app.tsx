import { AppProps } from 'next/app'

import Amplify from 'aws-amplify'
import config from '../../aws-exports'

import '@assets/css/tailwind.css'
import 'react-datepicker/dist/react-datepicker.css'

Amplify.configure({ ...config, ssr: true })

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App

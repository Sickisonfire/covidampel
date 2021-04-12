import ReactDOM from 'react-dom'
import App from './App'
import 'tailwindcss/dist/base.min.css'
import './index.css'
import { GlobalStyles } from 'twin.macro'
import { PersonCountState } from './contexts/personCountContext'

ReactDOM.render(
  <PersonCountState>
    <GlobalStyles />
    <App />
  </PersonCountState>,
  document.getElementById('root')
)

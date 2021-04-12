import ReactDOM from 'react-dom'
import App from './App'
import 'tailwindcss/dist/base.min.css'
import './index.css'
import { GlobalStyles } from 'twin.macro'

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root')
)

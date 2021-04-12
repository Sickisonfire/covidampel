import { ReactComponent as TickIcon } from './assets/mdi_check-circle-outline.svg'
import { ReactComponent as PersonIcon } from './assets/mdi_account.svg'
import { ReactComponent as FullscreenIcon } from './assets/mdi_fullscreen.svg'

import DebugWidget from './components/DebugWidget'

/** @jsxImportSource @emotion/react */
import tw, { css } from 'twin.macro'

const App = () => {
  return (
    <div tw='fixed top-0 left-0 bottom-0 right-0 bg-ampel-green flex flex-col'>
      <main tw='flex flex-grow '>
        <div tw='absolute right-5 top-5 text-white z-10 flex space-x-5 items-center'>
          <DebugWidget></DebugWidget>

          <button tw='focus:outline-none hover:(bg-black bg-opacity-30) rounded'>
            <FullscreenIcon />
          </button>
        </div>
        <div tw='w-7/12 flex items-center'>
          <h1 tw='text-8xl font-bold ml-20'>Sie dürfen die Filiale betreten!</h1>
        </div>
        <div tw='flex items-center w-5/12 justify-center flex-col  bg-black bg-opacity-80	'>
          <TickIcon width='450px' height='450px' />
          <div tw='flex items-center'>
            <p tw='font-bold text-white' style={{ fontSize: 214 }}>
              {' '}
              5
            </p>
            <PersonIcon width='228px' height='228px' />
          </div>
        </div>
      </main>
      <footer tw='bg-black p-6 '>
        <h1 tw='text-8xl font-bold text-white text-center '>Wir wünschen einen schönen Einkauf!</h1>
      </footer>
    </div>
  )
}

export default App

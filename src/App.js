import { useContext, useState, useEffect } from 'react'

import { ReactComponent as TickIcon } from './assets/mdi_check-circle-outline.svg'
import { ReactComponent as CrossIcon } from './assets/mdi_close-circle-outline.svg'
import { ReactComponent as PersonIcon } from './assets/mdi_account.svg'
import { ReactComponent as FullscreenIcon } from './assets/mdi_fullscreen.svg'

import { PersonCountContext } from './contexts/personCountContext'

import DebugWidget from './components/DebugWidget'

/** @jsxImportSource @emotion/react */
import tw, { css } from 'twin.macro'

const App = () => {
  const { personCountState } = useContext(PersonCountContext)
  const [storeFull, setStoreFull] = useState(false)

  useEffect(() => {
    if (personCountState.currentCount >= personCountState.maxCount) {
      setStoreFull(true)
    } else {
      setStoreFull(false)
    }
  }, [personCountState])

  return (
    <>
      <div
        css={[
          tw`fixed top-0 left-0 bottom-0 right-0 flex flex-col transition-all`,
          storeFull ? tw`bg-ampel-red` : tw`bg-ampel-green`,
        ]}
      >
        <main tw='flex flex-grow '>
          <div tw='absolute right-5 top-5 text-white z-10 flex space-x-5 items-center'>
            <DebugWidget />
            <button tw='focus:outline-none hover:(bg-black bg-opacity-30) rounded'>
              <FullscreenIcon />
            </button>
          </div>
          <div tw='w-7/12 flex items-center'>
            <h1 tw='text-8xl font-bold ml-20'>
              {storeFull
                ? 'Bitte betreten Sie die Filiale erst, wenn der Bildschirm grün wird.'
                : 'Sie dürfen die Filiale betreten!'}
            </h1>
          </div>
          <div tw='flex items-center w-5/12 justify-center flex-col  bg-black bg-opacity-80	'>
            {storeFull ? (
              <CrossIcon width='450px' height='450px' />
            ) : (
              <TickIcon width='450px' height='450px' />
            )}
            <div tw='flex items-center'>
              <p tw='font-bold text-white' style={{ fontSize: 214 }}>
                {personCountState.currentCount}
              </p>
              <PersonIcon width='228px' height='228px' />
            </div>
          </div>
        </main>
        <footer tw='bg-black p-6 '>
          <h1 tw='text-8xl font-bold text-white text-center '>
            {storeFull
              ? 'Bitte haben Sie etwas Geduld. Danke!'
              : 'Wir wünschen einen schönen Einkauf!'}
          </h1>
        </footer>
      </div>
    </>
  )
}

export default App

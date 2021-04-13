import { useContext, useState, useEffect } from 'react'
import { useFullScreen } from 'react-browser-hooks'

import { ReactComponent as TickIcon } from './assets/mdi_check-circle-outline.svg'
import { ReactComponent as CrossIcon } from './assets/mdi_close-circle-outline.svg'
// import { ReactComponent as PersonIcon } from './assets/mdi_account.svg'
import { ReactComponent as FullscreenIcon } from './assets/mdi_fullscreen.svg'
import { ReactComponent as ExitFullscreenIcon } from './assets/mdi_fullscreen-exit.svg'

import { PersonCountContext } from './contexts/personCountContext'
import { useIdleTimer } from './utils/useIdleTimer'

import DebugWidget from './components/DebugWidget'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

const App = () => {
  const [storeFull, setStoreFull] = useState(false)
  const [hoverMenu, setHoverMenu] = useState(false)
  const { personCountState } = useContext(PersonCountContext)
  const { toggle, fullScreen } = useFullScreen()
  const isIdle = useIdleTimer(8000)

  useEffect(() => {
    if (personCountState.currentCount >= personCountState.maxCount) {
      setStoreFull(true)
    } else {
      setStoreFull(false)
    }
  }, [personCountState])

  return (
    <AppWrapper css={[storeFull ? tw`bg-ampel-red` : tw`bg-ampel-green`]}>
      <Main>
        <MenuContainer
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          css={[isIdle && !hoverMenu && tw`hidden`]}
        >
          <DebugWidget />
          <FullScreenBtn onClick={toggle}>
            {fullScreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </FullScreenBtn>
        </MenuContainer>
        <MainLeftContainer>
          <Heading>
            {storeFull
              ? 'Bitte betreten Sie die Filiale erst, wenn der Bildschirm grün wird.'
              : 'Sie dürfen die Filiale betreten!'}
          </Heading>
        </MainLeftContainer>
        <MainRightContainer>
          {storeFull ? (
            <CrossIcon width='55vw' height='55vh' />
          ) : (
            <TickIcon width='55vw' height='55vh' />
          )}
          <div tw='flex items-center'>
            <PersonCount>
              {personCountState.currentCount}/{personCountState.maxCount}
            </PersonCount>
            {/* <PersonIcon width='228px' height='228px' /> */}
          </div>
        </MainRightContainer>
      </Main>
      <Footer>
        <FooterText>
          {storeFull
            ? 'Bitte haben Sie etwas Geduld. Danke!'
            : 'Wir wünschen einen schönen Einkauf!'}
        </FooterText>
      </Footer>
    </AppWrapper>
  )
}

/* -------------------------------------
    Styles
 -------------------------------------*/

const AppWrapper = tw.div`fixed top-0 left-0 bottom-0 right-0 flex flex-col transition-all`
const Main = tw.main`flex flex-grow`
const MenuContainer = tw.div`absolute right-5 top-5 text-white z-10 flex space-x-5 items-center`
const FullScreenBtn = tw.button`focus:outline-none hover:(bg-black bg-opacity-30) rounded`
const MainLeftContainer = tw.div`w-7/12 flex items-center p-32`
const MainRightContainer = tw.div`flex items-center w-5/12 justify-center flex-col bg-black bg-opacity-80`
const Heading = tw.h1`2xl:text-8xl text-7xl font-bold`
const PersonCount = tw.p`font-bold text-white leading-none 2xl:text-count text-9xl`
const Footer = tw.footer`hidden 2xl:(block bg-black p-6)`
const FooterText = tw.h1`text-8xl font-bold text-white text-center`

export default App

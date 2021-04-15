import { useContext, useState, useEffect, useRef } from 'react'
import { useFullScreen } from 'react-browser-hooks'
import Marquee from 'react-fast-marquee'

import { ReactComponent as TickIcon } from './assets/mdi_check-circle-outline.svg'
import { ReactComponent as CrossIcon } from './assets/mdi_close-circle-outline.svg'
import { ReactComponent as FullscreenIcon } from './assets/mdi_fullscreen.svg'
import { ReactComponent as ExitFullscreenIcon } from './assets/mdi_fullscreen-exit.svg'
import { ReactComponent as SettingsIcon } from './assets/mdi_cog.svg'
// import { ReactComponent as PersonIcon } from './assets/mdi_account.svg'

import { PersonCountContext } from './contexts/personCountContext'
import { useIdleTimer } from './utils/useIdleTimer'

import DebugWidget from './components/DebugWidget'
import SettingsOverlay from './components/SettingsOverlay'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

const App = () => {
  const [storeFull, setStoreFull] = useState(false)
  const [hoverMenu, setHoverMenu] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [marquee, setUseMarquee] = useState(false)
  const { personCountState } = useContext(PersonCountContext)
  const { toggle, fullScreen } = useFullScreen()
  const isIdle = useIdleTimer(8000)
  const bannerRef = useRef(null)
  const { currentCount, maxCount, bannerTextGreen, bannerTextRed } = personCountState

  useEffect(() => {
    if (currentCount >= maxCount) {
      setStoreFull(true)
    } else {
      setStoreFull(false)
    }

    if (bannerRef !== null || undefined) {
      if (bannerRef.current.clientWidth >= 1800) {
        setUseMarquee(true)
      } else {
        setUseMarquee(false)
      }
    }
  }, [currentCount, maxCount, settingsOpen, storeFull])

  return (
    <AppWrapper css={[storeFull ? tw`bg-ampel-red` : tw`bg-ampel-green`]}>
      <Main>
        {settingsOpen && <SettingsOverlay closeSettings={() => setSettingsOpen(false)} />}
        <MenuContainer
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          css={[isIdle && !hoverMenu && tw`hidden`]}
        >
          <DebugWidget />
          <Button onClick={() => setSettingsOpen(true)}>
            <SettingsIconWrapper>
              <SettingsIcon />
            </SettingsIconWrapper>
          </Button>
          <Button onClick={toggle}>
            {fullScreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </Button>
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
              {currentCount}/{maxCount}
            </PersonCount>
            {/* <PersonIcon width='228px' height='228px' /> */}
          </div>
        </MainRightContainer>
      </Main>
      {(bannerTextGreen === '' && !storeFull) || (bannerTextRed === '' && storeFull) ? null : (
        <Footer>
          {marquee ? (
            <Marquee gradient={false} play={marquee} speed={100} style={{ overflow: 'hidden' }}>
              <FooterTextMarquee>{storeFull ? bannerTextRed : bannerTextGreen}</FooterTextMarquee>
            </Marquee>
          ) : (
            <FooterTextRegular>{storeFull ? bannerTextRed : bannerTextGreen}</FooterTextRegular>
          )}
        </Footer>
      )}
      <DummyFooterText ref={bannerRef}>
        {storeFull ? bannerTextRed : bannerTextGreen}
      </DummyFooterText>
    </AppWrapper>
  )
}

/* -------------------------------------
    Styles
 -------------------------------------*/

const AppWrapper = tw.div`fixed top-0 left-0 bottom-0 right-0 flex flex-col transition-all`
const Main = tw.main`flex flex-grow`
const MenuContainer = tw.div`absolute right-5 top-5 text-white z-10 flex space-x-5 items-center`
const Button = tw.button`focus:outline-none hover:(bg-black bg-opacity-30) rounded`
const MainLeftContainer = tw.div`w-7/12 flex items-center p-32`
const MainRightContainer = tw.div`flex items-center w-5/12 justify-center flex-col bg-black bg-opacity-80`
const Heading = tw.h1`2xl:text-8xl text-7xl font-bold`
const PersonCount = tw.p`font-bold text-white leading-none 2xl:text-count text-9xl`
const Footer = tw.footer`hidden 2xl:(block bg-black p-6)`
const FooterTextBase = tw.h1`text-8xl font-bold text-white`
const FooterTextMarquee = tw(FooterTextBase)`overflow-clip whitespace-nowrap`
const FooterTextRegular = tw(FooterTextBase)`text-center`
const DummyFooterText = tw.span`fixed -bottom-80 text-8xl font-bold whitespace-nowrap`
const SettingsIconWrapper = tw.span`transition-transform transform hover:rotate-180 flex items-center`

export default App

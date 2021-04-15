import React, { useContext } from 'react'
import { PersonCountContext } from '../contexts/personCountContext'

import { ReactComponent as CloseIcon } from '../assets/mdi_close.svg'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

const SettingsOverlay = ({ closeSettings }) => {
  const { setMaxPersonCount, setBannerTextGreen, setBannerTextRed, personCountState } = useContext(
    PersonCountContext
  )

  return (
    <SettingsWrapper>
      <button onClick={() => closeSettings()}>
        <CloseIconWrapper>
          <CloseIcon />
        </CloseIconWrapper>
      </button>
      <ContentWrapper>
        <Heading>Einstellungen</Heading>
        <FormContainer>
          <label htmlFor='max'>Zulässige Anzahl an Kunden</label>
          <NumberInput
            type='number'
            name='max'
            id='max'
            value={personCountState.maxCount}
            onChange={(e) => setMaxPersonCount(+e.target.value)}
            min={0}
          />
          <label htmlFor='green'>
            Bannertext <span tw='text-ampel-green'>grün</span>
          </label>
          <TextInput
            type='text'
            name='green'
            id='green'
            value={personCountState.bannerTextGreen}
            onChange={(e) => setBannerTextGreen(e.target.value)}
          />

          <label htmlFor='red'>
            Bannertext <span tw='text-ampel-red'>rot</span>
          </label>
          <TextInput
            type='text'
            name='red'
            id='red'
            value={personCountState.bannerTextRed}
            onChange={(e) => setBannerTextRed(e.target.value)}
          />
        </FormContainer>
      </ContentWrapper>
    </SettingsWrapper>
  )
}

const SettingsWrapper = tw.div`absolute bg-black w-full h-full top-0 left-0 z-50 text-white`
const CloseIconWrapper = tw.span`absolute right-5 top-5 transition-transform transform hover:rotate-180`
const ContentWrapper = tw.div`p-12`
const Heading = tw.h1`text-8xl font-bold`
const FormContainer = tw.div`text-4xl font-bold grid grid-cols-2 gap-y-12 p-12 items-center mt-10`
const Input = tw.input`bg-black rounded hover:bg-gray-900`
const NumberInput = tw(Input)`text-8xl w-36 text-center rounded-lg font-bold`
const TextInput = tw(Input)`text-3xl p-2`

export default SettingsOverlay

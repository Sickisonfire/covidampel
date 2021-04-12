import React, { useState, useContext } from 'react'

import { PersonCountContext } from '../contexts/personCountContext'

import { ReactComponent as ChevronDownIcon } from '../assets/chevron.svg'
import { ReactComponent as PlusIcon } from '../assets/mdi_plus.svg'
import { ReactComponent as MinusIcon } from '../assets/mdi_minus.svg'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

const DebugWidget = () => {
  const {
    increasePersonCount,
    decreasePersonCount,
    setPersonCount,
    setMaxPersonCount,
    personCountState,
  } = useContext(PersonCountContext)

  const [widgetOpen, setWidgetOpen] = useState(false)

  return (
    <WidgetWrapper>
      <WidgetToggle onClick={() => setWidgetOpen(!widgetOpen)}>
        Debug
        <span css={[tw`transition-transform transform ml-2`, widgetOpen && tw`rotate-180`]}>
          <ChevronDownIcon />
        </span>
      </WidgetToggle>
      <IconWrapper css={[widgetOpen && tw`block`]} aria-orientation='vertical'>
        <div>
          <InputGroup>
            <InputWrapper>
              <label htmlFor='aktuell'>Aktuell</label>
              <Input
                type='number'
                name='aktuell'
                id='aktuell'
                step='1'
                min='0'
                value={personCountState.currentCount}
                onChange={(e) => setPersonCount(+e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor='max'>Max</label>
              <Input
                type='number'
                name='max'
                id='max'
                step='1'
                min='0'
                value={personCountState.maxCount}
                onChange={(e) => setMaxPersonCount(+e.target.value)}
              />
            </InputWrapper>
          </InputGroup>
          <ButtonGroup>
            <Button onClick={() => decreasePersonCount()}>
              <MinusIcon />
            </Button>
            <Button onClick={() => increasePersonCount()}>
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </div>
      </IconWrapper>
    </WidgetWrapper>
  )
}

/* -------------------------------------
    Styles
 -------------------------------------*/

const WidgetWrapper = tw.div`relative`
const WidgetToggle = tw.button`flex items-center px-2 py-1 focus:outline-none hover:(bg-black bg-opacity-30) rounded`
const IconWrapper = tw.span`hidden z-10 origin-top-right absolute right-0 p-6  w-48 rounded-md bg-black`
const InputGroup = tw.div`flex flex-col space-y-2 mb-4`
const InputWrapper = tw.div`flex justify-between items-center`
const Input = tw.input`bg-black w-8 h-8 bg-gray-900 text-center rounded focus:bg-gray-500`
const ButtonGroup = tw.div`w-full flex items-center justify-around pt-4 border-t border-gray-800`
const Button = tw.button`bg-gray-900 rounded hover:bg-gray-800 active:bg-gray-500`

export default DebugWidget

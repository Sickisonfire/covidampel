import React, { useState, useContext } from 'react'

import { PersonCountContext } from '../contexts/personCountContext'

import { ReactComponent as ChevronDownIcon } from '../assets/chevron.svg'
import { ReactComponent as PlusIcon } from '../assets/mdi_plus.svg'
import { ReactComponent as MinusIcon } from '../assets/mdi_minus.svg'

/** @jsxImportSource @emotion/react */
import tw, { css } from 'twin.macro'

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
    <div tw='relative'>
      <button
        tw='flex items-center px-2 py-1 focus:outline-none hover:(bg-black bg-opacity-30) rounded'
        onClick={() => setWidgetOpen(!widgetOpen)}
      >
        Debug
        <span css={[tw`transition-transform transform ml-2`, widgetOpen && tw`rotate-180`]}>
          <ChevronDownIcon />
        </span>
      </button>
      <div
        css={[
          tw`hidden z-10 origin-top-right absolute right-0 p-6  w-48 rounded-md bg-black`,
          widgetOpen && tw`block`,
        ]}
        aria-orientation='vertical'
      >
        <div>
          <div tw='flex flex-col space-y-2 mb-4'>
            <div tw='flex justify-between items-center'>
              <label htmlFor='aktuell'>Aktuell</label>
              <input
                type='number'
                name='aktuell'
                id='aktuell'
                step='1'
                min='0'
                value={personCountState.currentCount}
                onChange={(e) => setPersonCount(+e.target.value)}
                tw='bg-black w-8 h-8 bg-gray-900 text-center rounded focus:bg-gray-500'
              />
            </div>
            <div tw='flex justify-between items-center'>
              <label htmlFor='max'>Max</label>
              <input
                type='number'
                name='max'
                id='max'
                step='1'
                min='0'
                value={personCountState.maxCount}
                onChange={(e) => setMaxPersonCount(+e.target.value)}
                tw='bg-black w-8 h-8 bg-gray-900 text-center rounded focus:bg-gray-500'
              />
            </div>
          </div>
          <div tw='w-full flex items-center justify-around pt-4 border-t border-gray-800'>
            <button
              tw='bg-gray-900 rounded hover:bg-gray-800 active:bg-gray-500'
              onClick={() => decreasePersonCount()}
            >
              <MinusIcon />
            </button>
            <button
              tw='bg-gray-900 rounded hover:bg-gray-800 active:bg-gray-500'
              onClick={() => increasePersonCount()}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebugWidget

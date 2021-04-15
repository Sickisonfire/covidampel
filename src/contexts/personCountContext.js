import { createContext, useReducer } from 'react'
import {
  INCREASE_PERSON_COUNT,
  DECREASE_PERSON_COUNT,
  SET_PERSON_COUNT,
  SET_MAX_PERSON_COUNT,
  SET_BANNER_GREEN,
  SET_BANNER_RED,
} from './types'

/* -------------------------------------
    Initial State
 -------------------------------------*/

const initialState = {
  currentCount: 0,
  maxCount: 20,
  bannerTextGreen: 'Wir wünschen einen schönen Einkauf!',
  bannerTextRed: 'Bitte haben Sie etwas Geduld. Danke!',
}

/* -------------------------------------
    Context
 -------------------------------------*/

export const PersonCountContext = createContext()

/* -------------------------------------
    Reducer
 -------------------------------------*/

const PersonCountReducer = (state, action) => {
  switch (action.type) {
    case SET_PERSON_COUNT:
      return {
        ...state,
        currentCount: action.payload,
      }
    case SET_MAX_PERSON_COUNT:
      return {
        ...state,
        maxCount: action.payload,
      }
    case INCREASE_PERSON_COUNT:
      return {
        ...state,
        currentCount: state.currentCount + 1,
      }
    case DECREASE_PERSON_COUNT:
      return {
        ...state,
        currentCount: state.currentCount > 0 ? state.currentCount - 1 : 0,
      }
    case SET_BANNER_GREEN:
      return {
        ...state,
        bannerTextGreen: action.payload,
      }
    case SET_BANNER_RED:
      return {
        ...state,
        bannerTextRed: action.payload,
      }
    default:
      return state
  }
}

/* -------------------------------------
    State
 -------------------------------------*/

export const PersonCountState = (props) => {
  const [state, dispatch] = useReducer(PersonCountReducer, initialState)

  const setPersonCount = (newPersonCount) => {
    dispatch({
      type: SET_PERSON_COUNT,
      payload: newPersonCount,
    })
  }
  const setMaxPersonCount = (newMaxPersonCount) => {
    dispatch({
      type: SET_MAX_PERSON_COUNT,
      payload: newMaxPersonCount,
    })
  }
  const setBannerTextGreen = (text) => {
    dispatch({
      type: SET_BANNER_GREEN,
      payload: text,
    })
  }
  const setBannerTextRed = (text) => {
    dispatch({
      type: SET_BANNER_RED,
      payload: text,
    })
  }
  const increasePersonCount = () => {
    dispatch({
      type: INCREASE_PERSON_COUNT,
    })
  }
  const decreasePersonCount = () => {
    dispatch({
      type: DECREASE_PERSON_COUNT,
    })
  }

  return (
    <PersonCountContext.Provider
      value={{
        personCountState: state,
        setPersonCount,
        setMaxPersonCount,
        increasePersonCount,
        decreasePersonCount,
        setBannerTextGreen,
        setBannerTextRed,
      }}
    >
      {props.children}
    </PersonCountContext.Provider>
  )
}

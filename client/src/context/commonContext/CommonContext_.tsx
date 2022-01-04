import { createContext, useEffect, useReducer } from 'react'
import { commonReducer, CommonState } from './CommonReducer'

type CommonContextProps = {
  snackBar: {
    isOpen: boolean
    content: string
  }
  darkTheme: boolean  ,
  showSnackBar: (content: string, status: boolean) => void
  setTheme: () => void
}

const CommonInitialState: CommonState = {
  snackBar: {
    isOpen: false,
    content: '',
  },
  darkTheme: false,
}

export const CommonContext = createContext({} as CommonContextProps)

export const CommonProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(commonReducer, CommonInitialState)

  const showSnackBar = async (content: string, status: boolean) => {
    dispatch({ type: 'openSnackBar', payload: { content, status } })
  }

  const setTheme = () => {
    localStorage.setItem('darktheme', JSON.stringify(!state.darkTheme))
    dispatch({
      type: 'changeTheme',
      payload: !state.darkTheme,
    })
  }

  return (
    <CommonContext.Provider
      value={{
        ...state,
        setTheme,
        showSnackBar,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}

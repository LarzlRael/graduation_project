import { createContext, useReducer, useContext } from 'react'
import { commonReducer, CommonState, ISnackbar } from './CommonReducer'
import { HeatSourcesContext } from '../HeatSources/HeatSourceContext'
import { mapTypeStyle } from '../../data/data'

type CommonContextProps = {
  snackBar: ISnackbar
  darkTheme: boolean
  showSnackBar: (parameters: ISnackbar) => void
  setTheme: () => void
}

const CommonInitialState: CommonState = {
  snackBar: {
    isOpen: false,
    message: '',
    kind: true,
  },
  darkTheme: localStorage.getItem('darktheme') === 'true' ? true : false,
}

export const CommonContext = createContext({} as CommonContextProps)

export const CommonProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(commonReducer, CommonInitialState)

  const showSnackBar = (parameters: ISnackbar) => {
    dispatch({ type: 'openSnackBar', payload: { ...parameters } })
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

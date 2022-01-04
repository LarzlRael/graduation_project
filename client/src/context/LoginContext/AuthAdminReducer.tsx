export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated'
  token: string | null
  errorMessage: string
  user: null
  logged: boolean
  loading: boolean
}

type AuthAction =
  | { type: 'signUp'; payload: { token: string; usuario: any } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'noAuthenticated' }
  | { type: 'logout' }
  | { type: 'loading'; payload: boolean }

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
        errorMessage: action.payload,
      }
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      }
    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.usuario,
        logged: true,
      }

    case 'logout':
    case 'noAuthenticated':
      localStorage.removeItem('token')
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
        logged: false,
      }
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

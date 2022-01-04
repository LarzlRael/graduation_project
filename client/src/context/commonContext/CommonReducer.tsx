export interface CommonState {
  snackBar: {
    isOpen: boolean
    content: string
  },
  darkTheme: boolean,
}

type CommonAction =
  | { type: 'openSnackBar'; payload: { content: string; status: boolean } }
  | { type: 'changeTheme'; payload: boolean }
  /* | { type: 'removeError' }
  | { type: 'noAuthenticated' } 
  | { type: 'logout' }
  | { type: 'changeTheme'; payload: boolean }
  | { type: 'loading'; payload: boolean } */

export const commonReducer = (
  state: CommonState,
  action: CommonAction,
): CommonState => {
  switch (action.type) {
    case 'openSnackBar':
      return {
        ...state,
        snackBar: {
          content: action.payload.content,
          isOpen: action.payload.status,
        },
      }
    case 'changeTheme':
      return {
        ...state,
        darkTheme: action.payload,
      }
    default:
      return state
  }
}

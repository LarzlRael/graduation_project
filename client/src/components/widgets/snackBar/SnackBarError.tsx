/* import { wrongData } from '../../utils/Constant' */
import { PropsSnackBar } from './index'
export const SnackbarError = ({ message }: PropsSnackBar) => {
  return (
    <div
      className="snackText"
      style={{ background: '#c93f3f', color: 'var(--white)' }}
    >
      <i className="fas fa-times-circle"></i>
      {message}
    </div>
  )
}

// import { useTranslation } from 'react-i18next'
import { PropsSnackBar } from './index';

export const SnackbarSuccess = ({ message }: PropsSnackBar) => {
  // const { t } = useTranslation('success')
  return (
    <div
      className="snackText"
      style={{ background: 'var(--green)', color: 'var(--white)' }}
    >
      <i className="fas fa-check-circle"></i>
      {message}
      {/* {t(message)} */}
    </div>
  )
}

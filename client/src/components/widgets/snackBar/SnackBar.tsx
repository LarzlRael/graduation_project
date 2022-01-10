import { useContext } from 'react'
import '../styles/SnackBar.css'
import { SnackbarError, SnackbarSuccess } from './index'
import { CommonContext } from '../../../context/commonContext/CommonContext_'
export const Snackbar = () => {
  const { showSnackBar, snackBar } = useContext(CommonContext)
  const { isOpen, message, kind } = snackBar
  if (isOpen) {
    setTimeout(function () {
      showSnackBar({
        message: '',
        isOpen: false,
        kind: true,
      })
    }, 2500)
    if (kind) {
      return <SnackbarSuccess message={message} />
    } else {
      return <SnackbarError message={message} />
    }
  }
  return null
}

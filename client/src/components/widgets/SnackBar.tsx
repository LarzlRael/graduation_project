/* import React from "react";
import "./style/Snackbar.css";
import { connect } from "react-redux";
import { openSnackbar } from "../../store/actions";
import { SnackbarError, SnackbarSuccess } from "./";
function Snackbar(props) {
  const { open, message, kind } = props.snackbarReducer;
  if (open) {
    setTimeout(function () {
      props.openSnackbar("", false, true);
    }, 3000);
    if (kind) {
      return <SnackbarSuccess message={message} />;
    } else {
      return <SnackbarError message={message} />;
    }
  }
  return null;
}
const mapStateToProps = (state) => {
  return {
    snackbarReducer: state.snackbarReducer,
  };
};
const mapDispatchToProps = {
  openSnackbar,
};
export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
 */

export const SnackBar = () => {
  return (
    <div>
      
    </div>
  )
}

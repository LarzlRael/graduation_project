import { useTranslation } from "react-i18next";
const SnackbarSuccess = ({ message }) => {
  const { t } = useTranslation("success");
  return (
    <div
      className="snackText"
      style={{ background: "var(--green)", color: "var(--white)" }}
    >
      <i className="fas fa-check-circle"></i>
      {t(message)}
    </div>
  );
};

export default SnackbarSuccess;

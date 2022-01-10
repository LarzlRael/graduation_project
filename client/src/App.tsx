import { Navigator } from './navigator/NavigatorAdmin'
import { AuthProvider } from './context/LoginContext/AuthAdminContext'
import { HeatProvider } from './context/HeatSources/HeatSourceContext'
import { CommonProvider } from './context/commonContext/CommonContext_'
import { Snackbar } from './components/widgets/snackBar/SnackBar';

const App = () => {
  return (
    <CommonProvider>
      <AuthProvider>
        <HeatProvider>
          <Navigator />
          <Snackbar />
        </HeatProvider>
      </AuthProvider>
    </CommonProvider>
  )
}

export default App

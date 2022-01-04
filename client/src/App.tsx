import { Navigator } from './navigator/NavigatorAdmin'
import { AuthProvider } from './context/LoginContext/AuthAdminContext'
import { HeatProvider } from './context/HeatSources/HeatSourceContext'
import { CommonProvider } from './context/commonContext/CommonContext_'

const App = () => {
  return (
    <CommonProvider>
      <AuthProvider>
        <HeatProvider>
          <Navigator />
        </HeatProvider>
      </AuthProvider>
    </CommonProvider>
  )
}

export default App

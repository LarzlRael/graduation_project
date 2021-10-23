import { Navigator } from './navigator/NavigatorAdmin';
import { AuthProvider } from './context/AuthAdminContext';
import { HeatProvider } from './context/HeatSources/HeatSourceContext';

const App = () => {
  return (
    <AuthProvider>
      <HeatProvider>
        <Navigator />
      </HeatProvider>
    </AuthProvider>
  );
}

export default App;

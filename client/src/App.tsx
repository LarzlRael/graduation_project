import { Navigator } from './navigator/NavigatorAdmin';
import { AuthProvider } from './context/AuthAdminContext';

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;

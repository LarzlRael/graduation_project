import { Navigator } from './navigator/NavigatorAdmin';
import { AuthProvider } from './context/AuthAdminContext';


function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;

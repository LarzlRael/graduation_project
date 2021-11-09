import { useContext } from 'react';
import { AuthAdminContext } from '../context/AuthAdminContext';
// useTheme hook



export const useTheme = () => {

    const { setTheme, darkTheme } = useContext(AuthAdminContext);

    return {
        setTheme,
        darkTheme
    }
}

import { useContext } from 'react';
import { CommonContext } from '../context/commonContext/CommonContext_';
// useTheme hook



export const useTheme = () => {

    const { setTheme, darkTheme } = useContext(CommonContext);

    return {
        setTheme,
        darkTheme
    }
}

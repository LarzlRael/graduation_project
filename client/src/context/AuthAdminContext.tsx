import { createContext, useEffect, useReducer } from 'react';

import { authReducer, AuthState } from './AuthAdminReducer';
import { ErrorResponse, LoginData, LoginResponse, RegisterData } from './login.admin.interfaces';
import { serverAPI } from '../provider/serverConfig';
import { singInAdmin } from '../provider/authServices';
import tokenAuth from '../utils/token_auth';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    logged: boolean,
    darkTheme: boolean,
    singUp: (obj: any) => void;
    singIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
    checkToken: () => void;
    setTheme: () => void;
}

const AuthInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    logged: false,
    errorMessage: '',
    /* localStorage.setItem('darktheme', JSON.stringify(!state.darkTheme)); */
    darkTheme: localStorage.getItem('darktheme') === 'true' ? true : false,
};

export const AuthAdminContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AuthInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        console.log('checking token we');
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }
        // if there is not token
        if (!token) return dispatch({ type: 'noAuthenticated' });

        // There is token:
        try {
            const resp = await serverAPI.get<LoginResponse>('/auth/checktoken');
            /* if (resp.status !== 200) {
                return dispatch({ type: 'noAuthenticated' });
            } */
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.accessToken,
                    usuario: resp.data.usuario,
                },
            });
            localStorage.setItem('token', resp.data.accessToken);
        } catch (error) {
            return dispatch({ type: 'noAuthenticated' });
        }

    };

    const singIn = async ({ username, password }: LoginData) => {
        try {
            const data = await singInAdmin(username, password);
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.accessToken,
                    usuario: data.usuario,
                },
            });
            localStorage.setItem('token', data.accessToken);

        } catch (error: any) {

            /* console.log(error.response.data);
            console.log(error.response.data.error); */
            dispatch({
                type: 'addError',
                payload: 'Credenciales incorrectas',
            });
        }

    };

    const singUp = async ({ nombre, correo, password }: RegisterData) => {

        try {
            const { data } = await serverAPI.post<LoginResponse>('/usuarios', {
                correo, password, nombre,
            });

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.accessToken,
                    usuario: data.usuario,
                },
            });
            localStorage.setItem('token', data.accessToken);


        } catch (error: any) {
            const errores: ErrorResponse = error;
            console.log(errores);
            /* dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'El correo ya está registrado',
            }); */
        }

    };

    const logOut = async () => {
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        });
    };

    const setTheme = () => {
        localStorage.setItem('darktheme', JSON.stringify(!state.darkTheme));
        dispatch({
            type: 'changeTheme',
            payload: !state.darkTheme,
        });
    };


    return (
        <AuthAdminContext.Provider value={{
            singUp,
            singIn,
            logOut,
            removeError,
            checkToken,
            setTheme,
            ...state,
        }}>
            {children}
        </AuthAdminContext.Provider>
    );
};
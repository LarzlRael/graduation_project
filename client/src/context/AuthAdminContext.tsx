import { createContext, useEffect, useReducer } from 'react';

import { authReducer, AuthState } from './AuthAdminReducer';
import { serverAPI } from '../provider/serverProvider';
import { ErrorResponse, LoginData, LoginResponse, RegisterData } from './login.admin.interfaces';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    logged: boolean,
    singUp: (obj: any) => void;
    singIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
    checkToken: () => void;
}

const AuthInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    logged: true,
    errorMessage: '',
};

export const AuthAdminContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AuthInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await localStorage.getItem('token');

        // if there is not token
        if (!token) return dispatch({ type: 'noAuthenticated' });

        // There is token:

        const resp = await serverAPI.get<LoginResponse>('/auth/checktoken');
        if (resp.status !== 200) {
            return dispatch({ type: 'noAuthenticated' });
        }

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.accessToken,
                usuario: resp.data.usuario,
            },
        });
    };



    const singIn = async ({ username, password }: LoginData) => {
        try {
            const { data } = await serverAPI.post<LoginResponse>('/auth/signin', {
                username,
                password,
            });

            console.log(data);
            console.log(data.accessToken);
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.accessToken,
                    usuario: data.usuario,
                },
            });
            await localStorage.setItem('token', data.accessToken);


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
            await localStorage.setItem('token', data.accessToken);


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
        await localStorage.removeItem('token');
        dispatch({ type: 'logout' });

    };
    const removeError = () => {
        dispatch({
            type: 'removeError',
        });

    };


    return (
        <AuthAdminContext.Provider value={{
            singUp,
            singIn,
            logOut,
            removeError,
            checkToken,
            ...state,
        }}>
            {children}
        </AuthAdminContext.Provider>
    );
};
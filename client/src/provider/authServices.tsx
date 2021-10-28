import { serverAPI } from './serverConfig';
import { LoginResponse } from '../context/login.admin.interfaces';

export const singInAdmin = async (username: string, password: string) => {
    const { data } = await serverAPI.post<LoginResponse>('/auth/signin', {
        username,
        password,
    });
    return data;
}

export const singUp = async (correo: string, password: string, nombre: string) => {
    const { data } = await serverAPI.post<LoginResponse>('/usuarios', {
        correo, password, nombre,
    });
    return data;
}


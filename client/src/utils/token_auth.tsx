import { serverAPI } from '../provider/serverProvider';


//? funcione que sirve para poder enviar los headers

const tokenAuth = (token: string) => {
    if (token) {
        serverAPI.defaults.headers.common['token'] = token;
    } else {
        delete serverAPI.defaults.headers.common['token'];
    }
}

export default tokenAuth;
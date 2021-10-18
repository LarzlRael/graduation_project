import axios from 'axios';

/* const baseURL = process.env.REACT_APP_SERVER_URL; */
export const baseURL = 'http://192.168.0.9:4000';

export const serverAPI = axios.create({ baseURL });


// set the token if this exists
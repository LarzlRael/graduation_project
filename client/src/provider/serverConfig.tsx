import axios from 'axios';

export const baseURL = process.env.REACT_APP_SERVER_URL;

export const serverAPI = axios.create({ baseURL });
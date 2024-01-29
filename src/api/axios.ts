import axios from 'axios';

export const BASE_URL = 'https://swapi.dev/api';

export const api = axios.create({
  baseURL: '',
  timeout: 12000,
  headers: {
    accept: 'application/json',
  },
});

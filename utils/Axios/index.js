import axios from 'axios';
export const baseURL = 'http://192.168.0.121:4060';
// export const baseURL = 'https://peek-api.bosselt.com';
const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;

import axios from 'axios';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

const api = axios.create({
  baseURL: '/'
});

const getMainPage = () => api.post('/');
const getCurCategory = (fraze) => api.post(`/all-shops/${fraze}`);
const getCurShop = (fraze, type) => api.post(`/${type}/${fraze}`);

export {
  getMainPage,
  getCurCategory,
  getCurShop,
};
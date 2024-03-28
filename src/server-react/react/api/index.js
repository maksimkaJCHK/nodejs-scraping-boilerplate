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

// Новые товары
const getNewPage = () => api.post('/new');
const getNewCurCategory = (fraze) => api.post(`/new/${fraze}`);

export {
  getMainPage,
  getCurCategory,
  getCurShop,
  getNewPage,
  getNewCurCategory,
};
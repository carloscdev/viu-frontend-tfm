import axios from 'axios';

const handleAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  )

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('token')
        window.location.href = '/usuario/inicio-sesion'
      }
      return Promise.reject(error);
    }
  )
};


export default handleAxios;
import { ref } from "vue";
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const user = ref({
    userId: '',
    name: '',
    email: '',
    role: 'ADMIN',
    isActive: true,
    isDeleted: false,
  });
  const alert = ref({
    isActive: false,
    type: 'success',
    message: '',
  });

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/usuario/inicio-sesion';
  }

  const activeAlert = (type, message) => {
    alert.value.isActive = true;
    alert.value.type = type;
    alert.value.message = message || 'Ocurrió un error inesperado.';

    setTimeout(() => {
      alert.value.isActive = false;
    }, 5000);
  }

  const isAuth = () => {
    const token = localStorage.getItem('token')
    return !!(token);
  }

  const setToken = (data) => {
    localStorage.setItem('token', data)
  }

  const setUser = (data) => {
    user.value = data;
  }

  const getUser = () => {
    return user.value;
  }

  return {
    user,
    alert,
    logout,
    setToken,
    setUser,
    getUser,
    isAuth,
    activeAlert
  }
});
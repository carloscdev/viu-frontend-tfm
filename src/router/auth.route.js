import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'
import AuthLayout from '@/layouts/AuthLayout.vue';

const authRoute = [
  {
    meta: { title: 'Iniciar Sesión', layout: AuthLayout },
    path: '/usuario/inicio-sesion',
    name: 'login',
    component: Login
  },
  {
    meta: { title: 'Registrarse', layout: AuthLayout },
    path: '/usuario/registro',
    name: 'register',
    component: Register
  },
]

export default authRoute;
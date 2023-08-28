import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'

const authRoute = [
  {
    meta: { title: 'Iniciar Sesión' },
    path: '/usuario/inicio-sesion',
    name: 'login',
    component: Login
  },
  {
    meta: { title: 'Registrarse' },
    path: '/usuario/registro',
    name: 'register',
    component: Register
  },
]

export default authRoute;
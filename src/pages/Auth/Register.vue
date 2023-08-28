<script setup>
import { reactive } from 'vue';
import AuthLayout from '../../layouts/AuthLayout.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { Icon } from '@iconify/vue';

const user = reactive({
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  email: {
    required: helpers.withMessage('El correo electrónico es requerido', required),
    email: helpers.withMessage('El correo electrónico no es válido', email)
  },
  name: {
    required: helpers.withMessage('El nombre es requerido', required),
    minLengthValue: helpers.withMessage('El nombre debe tener al menos 3 caracteres', minLength(3))
  },
  password: {
    required: helpers.withMessage('La contraseña es requerida', required),
    minLengthValue: helpers.withMessage('La contraseña debe tener al menos 8 caracteres', minLength(8))
  },
  confirmPassword: {
    required: helpers.withMessage('La confirmación de contraseña es requerida', required),
    sameAsPassword: helpers.withMessage('Las contraseñas no coinciden', (value) => value === user.password)
  },
}

const v$ = useVuelidate(rules, user);

const handleLogin = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    console.log('Register');
  } else {
    console.log('Error');
  }
}

</script>

<template>
  <AuthLayout>
    <form class="grid gap-5 max-w-full" @submit.prevent="handleLogin">
      <div :class="v$.email.$error ? 'validate-danger' : ''">
        <label for="email">
          Correo Electrónico
        </label>
        <input type="email" id="email" v-model="user.email"/>
        <div class="text-red-500 text-sm">
          <p v-for="error of v$.email.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div :class="v$.name.$error ? 'validate-danger' : ''">
        <label for="text">
          Nombre
        </label>
        <input type="text" id="text" v-model="user.name"/>
        <div class="text-red-500 text-sm">
          <p v-for="error of v$.name.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div :class="v$.password.$error ? 'validate-danger' : ''">
        <label for="password">
          Contraseña
        </label>
        <input type="password" id="password" v-model="user.password"/>
        <div class="text-red-500 text-sm">
          <p v-for="error of v$.password.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div :class="v$.confirmPassword.$error ? 'validate-danger' : ''">
        <label for="password">
          Contraseña
        </label>
        <input type="password" id="password" v-model="user.confirmPassword"/>
        <div class="text-red-500 text-sm">
          <p v-for="error of v$.confirmPassword.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div class="grid gap-1">
        <button type="submit" class="button-primary">
          Registrarse
          <Icon icon="mdi:account-plus" class="text-lg"/>
        </button>
        <router-link class="button button-light" to="/usuario/inicio-sesion">
          ¿Ya tienes una cuenta?
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>

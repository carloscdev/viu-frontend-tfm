<script setup>
import { ref, reactive } from 'vue';
import AuthLayout from '../../layouts/AuthLayout.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { Icon } from '@iconify/vue';
import { AuthService } from '../../services/auth.service';
import { useStore } from '@/store/';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const authService = new AuthService();

const isLoading = ref(false);

const user = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
});

const rules = {
  name: {
    required: helpers.withMessage('El nombre es requerido', required),
    minLengthValue: helpers.withMessage('El nombre debe tener al menos 3 caracteres', minLength(3))
  },
  email: {
    required: helpers.withMessage('El correo electrónico es requerido', required),
    email: helpers.withMessage('El correo electrónico no es válido', email)
  },
  password: {
    required: helpers.withMessage('La contraseña es requerida', required),
    minLengthValue: helpers.withMessage('La contraseña debe tener al menos 8 caracteres', minLength(8))
  },
  passwordConfirm: {
    required: helpers.withMessage('La confirmación de contraseña es requerida', required),
    sameAsPassword: helpers.withMessage('Las contraseñas no coinciden', (value) => value === user.password)
  },
}

const v$ = useVuelidate(rules, user);

const handleRegister = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      const response = await authService.register(user);
      store.setToken(response.data.token);
      router.replace({ name: 'home' })
    } catch (error) {
      store.activeAlert('danger', error.response.data.message);
    } finally {
      isLoading.value = false;
    }
  }
}

</script>

<template>
  <AuthLayout>
    <form class="grid gap-5 max-w-full" @submit.prevent="handleRegister">
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
      <div :class="v$.passwordConfirm.$error ? 'validate-danger' : ''">
        <label for="password">
          Contraseña
        </label>
        <input type="password" id="password" v-model="user.passwordConfirm"/>
        <div class="text-red-500 text-sm">
          <p v-for="error of v$.passwordConfirm.$errors">
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

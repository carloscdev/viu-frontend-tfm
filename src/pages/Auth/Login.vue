<script setup>
import { ref, reactive } from 'vue';
import AuthLayout from '../../layouts/AuthLayout.vue';
import ButtonBase from '../../components/Base/ButtonBase.vue';
import { useVuelidate } from '@vuelidate/core';
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
  email: '',
  password: '',
});

const rules = {
  email: {
    required: helpers.withMessage('El correo electrónico es requerido', required),
    email: helpers.withMessage('El correo electrónico no es válido', email)
  },
  password: {
    required: helpers.withMessage('La contraseña es requerida', required),
    minLengthValue: helpers.withMessage('La contraseña debe tener al menos 8 caracteres', minLength(8))
  },
}

const v$ = useVuelidate(rules, user);

const handleLogin = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      const response = await authService.login(user);
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
    <form class="grid gap-5 max-w-full" @submit.prevent="handleLogin">
      <div :class="v$.email.$error ? 'validate-danger' : ''">
        <label for="email">
          Correo Electrónico
        </label>
        <input type="email" id="email" v-model="user.email"/>
        <div class="text-red-500 text-sm">
          <small v-for="error of v$.email.$errors">
            {{ error.$message }}
          </small>
        </div>
      </div>
      <div :class="v$.password.$error ? 'validate-danger' : ''">
        <label for="password">
          Contraseña
        </label>
        <input type="password" id="password" v-model="user.password"/>
        <div class="text-red-500 text-sm">
          <small v-for="error of v$.password.$errors">
            {{ error.$message }}
          </small>
        </div>
      </div>
      <div class="grid gap-1">
        <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
          Iniciar Sesión
          <Icon icon="mdi:account-lock-open" class="text-lg"/>
        </ButtonBase>
        <router-link class="button button-light" to="/usuario/registro">
          ¿No tienes una cuenta?
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>

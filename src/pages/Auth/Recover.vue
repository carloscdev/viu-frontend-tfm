<script setup>
import { ref, reactive } from 'vue';
import { AuthService } from '@/services/auth.service';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators'
import { Icon } from '@iconify/vue';
import { useStore } from '@/store/';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const authService = new AuthService();

const isLoading = ref(false);

const user = reactive({
  email: '',
});

const rules = {
  email: {
    required: helpers.withMessage('El correo electrónico es requerido', required),
    email: helpers.withMessage('El correo electrónico no es válido', email)
  },
}

const v$ = useVuelidate(rules, user);

const handleLogin = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      const response = await authService.recoveryPassword(user);
      store.setToken(response.data.token);
      store.activeAlert('success', 'Contraseña generada correctamente, revisa tu correo');
      router.replace({ name: 'login' })
    } catch (error) {
      store.activeAlert('danger', error.response.data.message, 'Ocurrió un error al generar una nueva contraseña');
    } finally {
      isLoading.value = false;
    }
  }
}

</script>

<template>
  <form class="grid gap-5 max-w-full" @submit.prevent="handleLogin">
    <div :class="v$.email.$error ? 'validate-danger' : ''">
      <label for="email">
        Correo Electrónico
      </label>
      <input type="email" id="email" v-model="user.email"/>
      <div class="text-red-600 text-sm">
        <p v-for="error of v$.email.$errors">
          {{ error.$message }}
        </p>
      </div>
    </div>
    <div class="grid gap-1">
      <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
        Generar Contraseña
        <Icon icon="mdi:account-lock-open" class="text-lg"/>
      </ButtonBase>
      <router-link class="button button-light" :to="{ name: 'login' }">
        Iniciar Sesión
      </router-link>
    </div>
  </form>
</template>

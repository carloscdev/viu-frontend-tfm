<script setup>
import { ref, reactive } from 'vue';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators'
import { Icon } from '@iconify/vue';
import { useStore } from '@/store/';
import { UserService } from '@/services/user.service';

const store = useStore();

const userService = new UserService();

const isLoading = ref(false);

const user = reactive({
  password: '',
  newPassword: '',
  confirmPassword: ''
});

const rules = {
  password: {
    required: helpers.withMessage('La contraseña actual es requerida', required),
    minLength: helpers.withMessage('La contraseña actual debe tener al menos 6 caracteres', minLength(6))
  },
  newPassword: {
    required: helpers.withMessage('La nueva contraseña es requerida', required),
    minLength: helpers.withMessage('La nueva contraseña debe tener al menos 6 caracteres', minLength(6))
  },
  confirmPassword: {
    required: helpers.withMessage('La confirmación de la nueva contraseña es requerida', required),
    sameAsPassword: helpers.withMessage('La confirmación de la nueva contraseña debe ser igual a la nueva contraseña', (value) => value === user.newPassword)
  }
}

const v$ = useVuelidate(rules, user);

const handleProfile = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      await userService.updatePassword(user);
      store.activeAlert('success', 'Se actualizó el perfil correctamente');
      user.password = '';
      user.newPassword = '';
      user.confirmPassword = '';
      v$.value.$reset()
    } catch (error) {
      store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al actualizar la contraseña');
    } finally {
      isLoading.value = false;
    }
  }
}

</script>

<template>
  <div class="w-full">
    <form class="grid gap-5 border border-dark-light p-5 rounded" @submit.prevent="handleProfile">
      <h2>Actualiza tu contraseña</h2>
      <div :class="v$.password.$error ? 'validate-danger' : ''">
        <label for="password">
          Contraseña
        </label>
        <input type="password" id="password" v-model="user.password" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.password.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div :class="v$.newPassword.$error ? 'validate-danger' : ''">
        <label for="password">
          Nueva Contraseña
        </label>
        <input type="password" id="password" v-model="user.newPassword" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.newPassword.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div :class="v$.confirmPassword.$error ? 'validate-danger' : ''">
        <label for="password">
          Confirmar Contraseña
        </label>
        <input type="password" id="password" v-model="user.confirmPassword" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.confirmPassword.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
        Actualizar
        <Icon icon="mdi:lock-outline" class="text-lg" />
      </ButtonBase>
    </form>
  </div>
</template>
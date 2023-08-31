<script setup>
import { ref, reactive, watch } from 'vue';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { Icon } from '@iconify/vue';
import { useStore } from '@/store/';
import { UserService } from '@/services/user.service';

const store = useStore();

const userService = new UserService();

const isLoading = ref(false);

const user = reactive({
  name: store.user.name,
  email: store.user.email,
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
}

const v$ = useVuelidate(rules, user);

watch(() => store.user, (newUser) => {
  user.name = newUser.name;
  user.email = newUser.email;
});

const handleProfile = async () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      await userService.updateProfile(user);
      store.activeAlert('success', 'Se actualizó el perfil correctamente');
    } catch (error) {
      store.activeAlert('danger', error.response.data.message);
    } finally {
      isLoading.value = false;
    }
  }
}
</script>

<template>
  <div class="w-full">
    <form class="grid gap-5 border border-dark-light p-5 rounded" @submit.prevent="handleProfile">
      <h2>Actualiza tu información</h2>
      <div :class="v$.name.$error ? 'validate-danger' : ''">
        <label for="name">
          Nombre
        </label>
        <input type="text" id="name" v-model="user.name" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.name.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div :class="v$.email.$error ? 'validate-danger' : ''">
        <label for="email">
          Correo Electrónico
        </label>
        <input type="email" id="email" v-model="user.email" />
        <div class="text-red-600 text-sm">
          <p v-for="error of v$.email.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <ButtonBase type="submit" :isLoading="isLoading" class="button-primary">
        Guardar
        <Icon icon="mdi:content-save-outline" class="text-lg" />
      </ButtonBase>
    </form>
  </div>
</template>
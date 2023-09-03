<script setup>
import { onMounted } from 'vue';
import NavBar from '@/components/Public/NavBar.vue';
import { useStore } from '@/store';
import { UserService} from '@/services/user.service';

const store = useStore();
const userService = new UserService();
const getProfile = async () => {
  try {
    const response = await userService.getProfile();
    await store.setUser(response.data);
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al obtener los datos de usuario');
  }
}

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    store.setToken(token);
    await getProfile();
  }
})
</script>

<template>
  <NavBar />
  <div class="w-[720px] mx-auto my-16 max-w-[90%] grid gap-5">
    <slot />
  </div>
</template>

<style>
@keyframes fadeUp {
  from {
    transform: translateY(40px)
  }

  to {
    transform: translateX(0);
    opacity: 1
  }
}

.fadeUp {
  animation-duration: 1s;
  animation-fill-mode: both;
  opacity: 0;
  animation-name: fadeUp;
}
</style>
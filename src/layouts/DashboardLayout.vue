<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/';
import SideMenu from '@/components/Dashboard/SideMenu.vue';
import { UserService } from '@/services/user.service';
import Footer from '@/components/Dashboard/Footer.vue';

const store = useStore();
const router = useRouter();
const userService = new UserService();
const isMenuActive = ref(true);

const getProfile = async () => {
  try {
    const response = await userService.getProfile();
    await store.setUser(response.data);
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al obtener los datos de usuario');
  }
}

const handleClick = () => {
  isMenuActive.value = !isMenuActive.value;
}

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    store.setToken(token);
    await getProfile();
  }
  if (!store.isAuth()) {
    router.replace({ name: 'login' })
    store.activeAlert('danger', 'Debes iniciar sesión para acceder a esta página');
  }
})
</script>

<template>
  <SideMenu :isActive="isMenuActive" @handleClick="handleClick" />
  <div :class="isMenuActive ? 'ml-[100px]' : 'ml-0'" class="ease-in-out duration-300">
    <main class="my-10 mx-5 flex flex-col gap-12">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/';
import SideMenu from '@/components/Dashboard/SideMenu.vue';
import { UserService } from '@/services/user.service';
import Footer from '@/components/Dashboard/Footer.vue';

const store = useStore();
const router = useRouter();

const userService = new UserService();

const getProfile = async () => {
  try {
    const response = await userService.getProfile();
    await store.setUser(response.data);
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message);
  }
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
  <SideMenu />
  <div class="md:ml-[100px]">
    <main class="my-10 mx-5 flex flex-col gap-12">
      <slot />
    </main>
    <Footer />
  </div>
</template>

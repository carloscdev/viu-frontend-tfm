<script setup>
import TitleBase from '@/components/Base/TitleBase.vue';
import UpdateProfile from './Components/UpdateProfile.vue';
import UpdatePassword from './Components/UpdatePassword.vue';
</script>

<template>
  <TitleBase title="Mi Perfil" subtitle="Actualiza tu información y contraseña" />
  <div class="flex flex-col md:flex-row gap-10">
    <UpdateProfile />
    <UpdatePassword />
  </div>
</template>

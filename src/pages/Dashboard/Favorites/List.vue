<script setup>
import FavoriteList from './Components/FavoriteList.vue';
import TitleBase from '@/components/Base/TitleBase.vue';
</script>

<template>
  <TitleBase :title="`Favoritos`" subtitle="Administra tus publicaciones favoritas" />
  <FavoriteList />
</template>

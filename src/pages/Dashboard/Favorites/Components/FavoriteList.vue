<script setup>
import { onMounted, ref } from 'vue';
import { FavoriteService } from '@/services/favorite.service';
import { useStore } from '@/store/'
import { formatSimpleDate } from '@/utils/handleDate'
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';
import Loading from '@/components/Dashboard/Loading.vue';

const store = useStore();

const favoriteService = new FavoriteService();

const favorites = ref([]);
const isLoading = ref(false);

const getRecentDocuments = async () => {
  try {
    isLoading.value = true;
    const response = await favoriteService.getFavorites();
    favorites.value = response.data;
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener tus publicaciones favoritas.');
  } finally {
    isLoading.value = false;
  }
}

const removeFavorite  = async (favoriteId) => {
  try {
    await favoriteService.removeFavorite(favoriteId);
    favorites.value = favorites.value.filter((favorite) => favorite.favoriteId !== favoriteId);
    store.activeAlert('success', 'Se ha eliminado el favorito correctamente.');
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo eliminar el favorito.');
  }
}

onMounted(async () => {
  await getRecentDocuments();
})

</script>

<template>
  <section>
    <div class="table mt-0" v-if="favorites.length && !isLoading">
      <ul class="table-head grid-cols-[0.4fr,0.4fr,0.3fr,0.3fr,0.2fr,0.05fr]">
        <li>Título</li>
        <li>Descripción</li>
        <li>Usuario</li>
        <li>Categoría</li>
        <li>Fecha</li>
        <li></li>
      </ul>
      <ul v-for="favorite of favorites" :key="favorite.favoriteId" class="table-row grid-cols-[0.4fr,0.4fr,0.3fr,0.3fr,0.2fr,0.05fr]">
        <li class="font-bold">
          <a target="_blank" :href="`/publico/${favorite.document.slug}`" class="text-primary hover:underline">
            {{ favorite.document.title }}
            <Icon icon="mdi:open-in-new" class="inline-block w-4 h-4" />
          </a>
        </li>
        <li>{{ favorite.document.description.substring(0, 50) }}...</li>
        <li>{{ favorite.user.name }}</li>
        <li>{{ favorite.document.category.title }}</li>
        <li>{{ formatSimpleDate(favorite.document.createdAt) }}</li>
        <li title="Remover de favoritos">
          <Icon icon="mdi:heart-remove" class="text-red-600 text-2xl cursor-pointer" @click="removeFavorite(favorite.document.documentId)" />
        </li>
      </ul>
    </div>
    <Empty v-if="!favorites.length && !isLoading" />
    <Loading v-if="isLoading" />
  </section>
</template>

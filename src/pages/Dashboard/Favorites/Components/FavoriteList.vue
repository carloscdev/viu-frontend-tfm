<script setup>
import { onMounted, ref } from 'vue';
import { FavoriteService } from '@/services/favorite.service';
import { useStore } from '@/store/'
import { formatSimpleDate } from '@/utils/handleDate'
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';

const store = useStore();

const favoriteService = new FavoriteService();

const favorites = ref([]);

const getRecentDocuments = async () => {
  try {
    const response = await favoriteService.getFavorites();
    favorites.value = response.data;
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener las ultimas publicaciones.');
  }
}

onMounted(async () => {
  await getRecentDocuments();
})

</script>

<template>
  <section>
    <div class="table mt-0" v-if="favorites.length">
      <ul class="table-head grid-cols-[0.4fr,0.4fr,0.2fr,0.2fr,0.2fr,0.1fr]">
        <li>Título</li>
        <li>Descripción</li>
        <li>Usuario</li>
        <li>Categoría</li>
        <li>Fecha</li>
        <li></li>
      </ul>
      <ul v-for="favorite of favorites" :key="favorite.favoriteId" class="table-row grid-cols-[0.4fr,0.4fr,0.2fr,0.2fr,0.2fr,0.1fr]">
        <li class="font-bold">
          <a target="_blank" :href="`/public/document/${favorite.slug}`" class="text-primary hover:underline">
            {{ favorite.document.title }}
            <Icon icon="mdi:open-in-new" class="inline-block w-4 h-4" />
          </a>
        </li>
        <li>{{ favorite.document.description }}</li>
        <li>{{ favorite.user.name }}</li>
        <li>{{ favorite.document.category.title }}</li>
        <li>{{ formatSimpleDate(favorite.document.createdAt) }}</li>
        <li>
          <Icon icon="mdi:delete-outline" class="text-red-600 text-2xl cursor-pointer" />
        </li>
      </ul>
    </div>
    <Empty v-else />
  </section>
</template>

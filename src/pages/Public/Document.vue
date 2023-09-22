<script setup>
import { onMounted, ref } from 'vue';
import { DocumentService } from '@/services/document.service';
import { FavoriteService } from '@/services/favorite.service';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/';
import { formatSimpleDate } from '@/utils/handleDate';
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';
import Footer from '@/components/Dashboard/Footer.vue';
import LoadingDocument from './Components/LoadingDocument.vue';
import Comments from './Components/Comments.vue';
import Items from './Components/Items.vue';
import Files from './Components/Files.vue';

const store = useStore();
const route = useRoute();
const slug = route.params.slug;

const documentService = new DocumentService();
const favoriteService = new FavoriteService();
const document = ref({});
const items = ref([]);
const files = ref([]);
const user = ref({});
const category = ref({});
const existDocument = ref(true);
const isLoading = ref(true);
const isFavorite = ref(false);

const handleFavorite = async () => {
  try {
    if (isFavorite.value) {
      isFavorite.value = false;
      await favoriteService.removeFavorite(document.value.documentId);
      store.activeAlert('success', 'Se ha eliminado de favoritos');
    } else {
      isFavorite.value = true;
      await favoriteService.addFavorite(document.value.documentId);
      store.activeAlert('success', 'Se ha agregado a favoritos');
    }
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al agregar a favoritos');
  }
}

onMounted(async () => {
  try {
    const response = await documentService.getDocumentBySlug(slug);
    document.value = await response.data.document;
    user.value = await response.data.document.user;
    items.value = await response.data.items;
    files.value = await response.data.files;
    category.value = await response.data.document.category;
    window.document.title = document.value.title + ' — VIU HUB';
    if (store.isAuth()) {
      try {
        const responseFavorite = await favoriteService.validateFavorite(document.value.documentId);
        isFavorite.value = responseFavorite.data.favorite;
      } catch (error) {
        //
      }
    }
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al obtener el documento');
    existDocument.value = false;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
});

</script>

<template>
  <div v-if="existDocument && !isLoading">
    <main v-if="document" class="border-t border-dark-gray py-10 fadeUp">
      <div class="flex items-center justify-between">
        <small class="border border-dark-gray bg-dark-gray font-bold text-dark-light p-2 rounded-full inline-block mb-5">{{ category.title }}</small>
        <div v-if="store.isAuth()">
          <Icon v-if="isFavorite" icon="mdi:heart" class="text-[2.5rem] text-red-500 cursor-pointer" @click="handleFavorite" />
          <Icon v-else icon="mdi:heart-outline" class="text-[2.5rem] cursor-pointer" @click="handleFavorite" />
        </div>
      </div>
      <h1>{{ document.title }}</h1>
      <p class="mt-5 text-xl text-dark-light">{{ document.description }}</p>
      <section class="flex items-center gap-1 mt-5">
        <Icon icon="mdi:account-circle" class="text-[2.5rem]" />
        <h3>
          <span class="font-bold block -mb-2">{{ user.name }}</span>
          <small class="text-dark-light text-sm">Actualizado el: {{ formatSimpleDate(document.updatedAt) }}</small>
        </h3>
      </section>
    </main>
    <Files v-if="files.length > 0" :files="files" />
    <Items :items="items" />
    <Comments :documentId="document.documentId" />
    <Footer />
  </div>
  <Empty v-else />
  <LoadingDocument v-if="isLoading" />
</template>
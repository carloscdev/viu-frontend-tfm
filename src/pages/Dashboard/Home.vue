<script setup>
import { onMounted, ref } from 'vue';
import RecentDocs from '@/components/Dashboard/RecentDocs.vue';
import { useStore } from '@/store/';
import { DocumentService } from '@/services/document.service';
import { FavoriteService } from '@/services/favorite.service';
import { CommentService } from '@/services/comment.service';
import { formatSimpleDate } from '@/utils/handleDate';
import TitleBase from '@/components/Base/TitleBase.vue';

const store = useStore();
const documentService = new DocumentService();
const favoriteService = new FavoriteService();
const commentService = new CommentService();

const totalDocument = ref(0);
const totalFavorites = ref(0);
const totalComments = ref(0);

const getTotal = async () => {
  try {
    const documents = await documentService.getTotalDocuments();
    totalDocument.value = documents.data.total;
    const favorites = await favoriteService.getTotalFavorites();
    totalFavorites.value = favorites.data.total;
    const comments = await commentService.getTotalComments();
    totalComments.value = comments.data.total;
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message);
  }
}

onMounted(async () => {
  await getTotal();
})
</script>

<template>
  <TitleBase :title="`Bienvenido ${store.user.name}`" :subtitle="`Rol: ${store.user.role}, Fecha Actual: ${formatSimpleDate(new Date)}`" />
  <section class="grid md:grid-cols-3 gap-5">
    <div class="bg-green-500/30 rounded p-5 shadow">
      <h3 class="text-xl font-light">Documentos Publicados</h3>
      <p class="text-3xl font-bold">{{ totalDocument }}</p>
    </div>
    <div class="bg-blue-500/30 rounded p-5 shadow">
      <h3 class="text-xl font-light">Favoritos Añadidos</h3>
      <p class="text-3xl font-bold">{{ totalFavorites }}</p>
    </div>
    <div class="bg-indigo-500/30 rounded p-5 shadow">
      <h3 class="text-xl font-light">Comentarios en tus documentos</h3>
      <p class="text-3xl font-bold">{{ totalComments }}</p>
    </div>
  </section>
  <RecentDocs />
</template>

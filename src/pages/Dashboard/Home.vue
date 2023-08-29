<script setup>
import { onMounted, ref } from 'vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import RecentDocs from '@/components/Dashboard/RecentDocs.vue';
import { useStore } from '@/store/';
import { DocumentService } from '@/services/document.service';
import { FavoriteService } from '@/services/favorite.service';
import { CommentService } from '@/services/comment.service';

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
  <DashboardLayout :title="`Bienvenido ${store.user.name}`" >
    <section class="grid sm:grid-cols-3 gap-5">
      <div class="bg-green-500/30 rounded p-5 shadow">
        <h3 class="text-xl font-light">Documentos</h3>
        <p class="text-3xl font-bold">{{ totalDocument }}</p>
      </div>
      <div class="bg-blue-500/30 rounded p-5 shadow">
        <h3 class="text-xl font-light">Favoritos</h3>
        <p class="text-3xl font-bold">{{ totalFavorites }}</p>
      </div>
      <div class="bg-primary/30 rounded p-5 shadow">
        <h3 class="text-xl font-light">Comentarios</h3>
        <p class="text-3xl font-bold">{{ totalComments }}</p>
      </div>
    </section>
    <RecentDocs />
  </DashboardLayout>
</template>

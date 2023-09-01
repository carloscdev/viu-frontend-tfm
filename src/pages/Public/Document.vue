<script setup>
import { onMounted, ref } from 'vue';
import { DocumentService } from '@/services/document.service';
import { CommentService } from '@/services/comment.service';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/';
import { formatSimpleDate } from '@/utils/handleDate';
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';
import Footer from '@/components/Dashboard/Footer.vue';
import LoadingDocument from './Components/LoadingDocument.vue';

const store = useStore();
const route = useRoute();
const slug = route.params.slug;

const documentService = new DocumentService();
const commentService = new CommentService();
const document = ref({});
const items = ref([]);
const user = ref({});
const category = ref({});
const comments = ref([]);
const existDocument = ref(true);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await documentService.getDocumentBySlug(slug);
    document.value = await response.data.document;
    user.value = await response.data.document.user;
    items.value = await response.data.items;
    category.value = await response.data.document.category;
    const commentResponse = await commentService.getCommentsByDocument(document.value.documentId);
    comments.value = await commentResponse.data;
    window.document.title = document.value.title + ' — VIU HUB';
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error');
    existDocument.value = false;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
});

</script>

<template>
  <div class="w-[720px] mx-auto my-16 max-w-[90%] grid gap-5" v-if="existDocument && !isLoading">
    <main v-if="document" class="border-t border-dark-gray py-10">
      <small class="text-dark-light text-sm">Categoría: {{ category.title }}</small>
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
    <section class="border-t border-dark-gray py-10">
      <ul class="grid gap-10">
        <li v-for="item of items">
          <div v-html="item.content"></div>
        </li>
      </ul>
    </section>
    <section class="border-t border-dark-gray py-10">
      <h1>Comentarios</h1>
      <ul class="grid gap-5 mt-10" v-if="comments.length > 0">
        <li v-for="comment of comments" class="border border-dark-light rounded p-5">
          <section class="flex items-center gap-1">
            <Icon icon="mdi:account-circle-outline" class="text-[2.5rem]" />
            <h3>
              <span class="font-bold block -mb-2">{{ comment.user.name }}</span>
              <small class="text-dark-light text-sm">Publicado el: {{ formatSimpleDate(comment.createdAt) }}</small>
            </h3>
          </section>
          <p class="mt-5 text-lg">
            {{ comment.content }}
          </p>
        </li>
      </ul>
      <Empty v-else />
    </section>
    <Footer />
  </div>
  <Empty v-else />
  <LoadingDocument v-if="isLoading" />
</template>
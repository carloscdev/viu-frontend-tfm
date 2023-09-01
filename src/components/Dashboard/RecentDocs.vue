<script setup>
import { onMounted, ref } from 'vue';
import { DocumentService } from '@/services/document.service';
import { useStore } from '@/store/'
import { formatSimpleDate } from '@/utils/handleDate'
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';

const store = useStore();

const documentService = new DocumentService();

const documents = ref([]);

const getRecentDocuments = async () => {
  try {
    const response = await documentService.getRecentDocuments();
    documents.value = response.data;
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
    <h2>Nuevas publicaciones</h2>
    <div class="table" v-if="documents.length">
      <ul class="table-head grid-cols-[0.4fr,0.4fr,0.3fr,0.2fr,0.2fr]">
        <li>Título</li>
        <li>Descripción</li>
        <li>Usuario</li>
        <li>Categoría</li>
        <li>Fecha</li>
      </ul>
      <ul v-for="doc of documents" :key="doc.documentId" class="table-row grid-cols-[0.4fr,0.4fr,0.3fr,0.2fr,0.2fr]">
        <li class="font-bold">
          <a target="_blank" :href="`/publico/${doc.slug}`" class="text-primary hover:underline">
            {{ doc.title }}
            <Icon icon="mdi:open-in-new" class="inline-block w-4 h-4" />
          </a>
        </li>
        <li>{{ doc.description.substring(0, 50) }}...</li>
        <li>{{ doc.user.name }}</li>
        <li>{{ doc.category.title }}</li>
        <li>{{ formatSimpleDate(doc.createdAt) }}</li>
      </ul>
    </div>
    <Empty v-else />
  </section>
</template>

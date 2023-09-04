<script setup>
import { onMounted, ref } from 'vue';
import { DocumentService } from '@/services/document.service';
import { useStore } from '@/store/';
import { formatSimpleDate } from '@/utils/handleDate';
import TitleBase from '@/components/Base/TitleBase.vue';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { Icon } from '@iconify/vue';
import ModalAdd from './Components/ModalAdd.vue';
import Empty from '../../../components/Dashboard/Empty.vue';
import Loading from '@/components/Dashboard/Loading.vue';

const store = useStore();

const documentService = new DocumentService();
const isModalOpen = ref(false);
const isLoading = ref(false);

const documents = ref([]);

const getRecentDocuments = async () => {
  try {
    isLoading.value = true;
    const response = await documentService.getDocuments();
    documents.value = response.data;
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener las publicaciones.');
  } finally {
    isLoading.value = false;
  }
}
const handleModal = () => {
  isModalOpen.value = !isModalOpen.value;
}
onMounted(async () => {
  await getRecentDocuments();
})

</script>

<template>
  <TitleBase :title="`Lista de documentos`" subtitle="Crea, edita, y elimina tus documentos técnivos y wikis" />
  <section>
    <div class="ml-auto sm:w-56">
      <ButtonBase @click="handleModal" class="button-primary">
        AÑADIR
        <Icon icon="mdi:plus" class="text-lg" />
      </ButtonBase>
    </div>
    <div class="table" v-if="documents.length && !isLoading">
      <ul class="table-head grid-cols-[repeat(2,0.4fr),repeat(2,0.2fr),0.1fr]">
        <li>Título</li>
        <li>Descripción</li>
        <li>Categoría</li>
        <li>Actualizado</li>
        <li>Publicado</li>
      </ul>
      <ul v-for="doc of documents" :key="doc.documentId" class="table-row grid-cols-[repeat(2,0.4fr),repeat(2,0.2fr),0.1fr]">
        <li class="font-bold">
          <router-link :to="{ name: 'add-items', params: { documentId: doc.documentId } }" class="text-primary hover:underline">
            {{ doc.title }}
            <Icon icon="mdi:file-document-edit-outline" class="text-lg" />
          </router-link>
        </li>
        <li>{{ doc.description.substring(0, 50) }}...</li>
        <li>{{ doc.category.title }}</li>
        <li>{{ formatSimpleDate(doc.createdAt) }}</li>
        <li class="text-2xl flex gap-1 items-center">
          <Icon v-if="doc.isPublished" icon="mdi:check" class="text-green-500" />
          <Icon v-else icon="mdi:close" class="text-red-600" />
          <a v-if="doc.isPublished" target="_blank" :href="`/publico/${doc.slug}`" class="hover:text-primary">
            <Icon icon="mdi:eye-outline" />
          </a>
        </li>
      </ul>
    </div>
    <Empty v-if="!documents.length && !isLoading" />
    <Loading v-if="isLoading" />
  </section>
  <ModalAdd v-if="isModalOpen" @close="handleModal" />
</template>

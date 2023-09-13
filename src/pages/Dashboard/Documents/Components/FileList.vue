<script setup>
import { ref, onMounted } from 'vue';
import { FileService } from '@/services/file.service';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/';
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import ConfirmDelete from '@/components/Dashboard/ConfirmDelete.vue';
import ModalEditFile from './ModalEditFile.vue';
import ModalAddFile from './ModalAddFile.vue';
import Loading from '@/components/Dashboard/Loading.vue';

const fileService = new FileService();
const route = useRoute();
const store = useStore();

const isLoading = ref(false);
const openModalEdit = ref(false);
const openModalDelete = ref(false);
const openModalAdd = ref(false);
const files = ref([]);
const fileId = ref(null);
const fileName = ref(null);

const getFilesByDocument = async () => {
  try {
    isLoading.value = true;
    const response = await fileService.getFilesByDocument(route.params.documentId);
    files.value = response.data;
  } catch (error) {
    console.log(error);
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al obtener los items');
  } finally {
    isLoading.value = false;
  }
}

const handleModalEdit = async (id = null, name = null) => {
  fileId.value = id;
  fileName.value = name;
  openModalEdit.value = !openModalEdit.value;
  if (!openModalEdit.value) {
    await getFilesByDocument();
  }
}

const handleModalDelete = (id = null) => {
  fileId.value = id;
  openModalDelete.value = !openModalDelete.value;
}

const handleModalAdd = async () => {
  openModalAdd.value = !openModalAdd.value;
  if (!openModalAdd.value) {
    await getFilesByDocument();
  }
}

const deleteFile = async () => {
  try {
    await fileService.deleteFile(fileId.value);
    files.value = files.value.filter(item => item.fileId !== fileId.value);
    store.activeAlert('success', 'Archivo eliminado correctamente');
    handleModalDelete();
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al eliminar el archivo');
  }
}

const getExtensionFile = (url) => {
  const extension = url.split('.').pop();
  return extension;
}

onMounted(async () => {
  await getFilesByDocument();
})
</script>

<template>
  <div class="grid gap-5">
    <hr>
    <h2>Archivos</h2>
    <ul v-if="files.length && !isLoading" class="flex gap-5 flex-wrap">
      <li v-for="item of files" :key="item.fileItem" class="border border-dark-light p-5 rounded grid gap-3 w-full sm:w-44">
        <a class="text-center" :href="item.url" target="_blank" >
          <Icon icon="mdi:file-outline" class="text-6xl text-dark-light mx-auto" />
          <p class="font-semibold">{{ item.name }}.{{ getExtensionFile(item.url) }}</p>
        </a>
        <div class="w-full flex gap-3 sm:w-28 mx-auto">
          <ButtonBase type="button" :isLoading="isLoading" class="button-outline-primary group" @click="handleModalEdit(item.fileId, item.name)">
            <Icon icon="mdi:pencil-outline" class="text-lg text-primary group-hover:text-white" />
          </ButtonBase>
          <ButtonBase type="button" :isLoading="isLoading" class="button-outline-danger group" @click="handleModalDelete(item.fileId)">
            <Icon icon="mdi:delete-outline" class="text-lg text-red-600 group-hover:text-white" />
          </ButtonBase>
        </div>
      </li>
    </ul>
    <Empty v-if="!files.length && !isLoading" />
    <Loading v-if="isLoading" />
    <div class="grid w-full gap-3 ml-auto sm:w-56">
      <ButtonBase type="button" :isLoading="isLoading" class="button-primary" @click="handleModalAdd">
        Agregar
        <Icon icon="mdi:file-plus-outline" class="text-lg" />
      </ButtonBase>
    </div>
  </div>
  <ModalAddFile v-if="openModalAdd" @close="handleModalAdd" />
  <ModalEditFile v-if="openModalEdit" @close="handleModalEdit" :fileId="fileId" :name="fileName" />
  <ConfirmDelete v-if="openModalDelete" title="¿Estás seguro de eliminar este archivo?" subtitle="Solo se eliminará este archivo, NO el documento" @close="handleModalDelete" @confirm="deleteFile" />
</template>

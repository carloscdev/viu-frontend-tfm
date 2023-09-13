<script setup>
import { ref, onMounted } from 'vue';
import { ItemService } from '@/services/item.service';
import { useStore } from '@/store/';
import { useRoute } from 'vue-router';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';
import ModalAddItem from './ModalAddItem.vue';
import ModalEditItem from './ModalEditItem.vue';
import ConfirmDelete from '@/components/Dashboard/ConfirmDelete.vue';
import Loading from '@/components/Dashboard/Loading.vue';

const itemService = new ItemService();
const store = useStore();
const route = useRoute();
const isLoading = ref(false);

const listItem = ref([])
const openModalAdd = ref(false);
const openModalEdit = ref(false);
const openModalDelete = ref(false);

const itemId = ref(null);
const handleModalAdd = async () => {
  openModalAdd.value = !openModalAdd.value;
  if (!openModalAdd.value) {
    await getItemsByDocument();
  }
}

const handleModalEdit = async (id = null) => {
  itemId.value = id;
  openModalEdit.value = !openModalEdit.value;
  if (!openModalEdit.value) {
    await getItemsByDocument();
  }
}

const handleModalDelete = (id = null) => {
  itemId.value = id;
  openModalDelete.value = !openModalDelete.value;
}

const deleteItem = async () => {
  try {
    await itemService.deleteItem(itemId.value);
    listItem.value = listItem.value.filter(item => item.itemId !== itemId.value);
    store.activeAlert('success', 'Item eliminado correctamente');
    handleModalDelete();
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al eliminar el item');
  }
}

const getItemsByDocument = async () => {
  try {
    isLoading.value = true;
    const response = await itemService.getItemsByDocument(route.params.documentId);
    listItem.value = [...response.data];
  } catch (error) {
    console.log(error);
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al obtener los items');
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await getItemsByDocument();
});
</script>

<template>
  <div class="grid gap-5">
    <hr>
    <h2>Contenido</h2>
    <ul v-if="listItem.length && !isLoading" class="grid gap-5">
      <li v-for="item of listItem" :key="item.itemId" class="border border-dark-light p-5 rounded grid gap-3">
        <div v-html="item.content"></div>
        <div class="w-full flex gap-3 sm:w-28 ml-auto">
          <ButtonBase type="button" :isLoading="isLoading" class="button-outline-primary group" @click="handleModalEdit(item.itemId)">
            <Icon icon="mdi:pencil-outline" class="text-lg text-primary group-hover:text-white" />
          </ButtonBase>
          <ButtonBase type="button" :isLoading="isLoading" class="button-outline-danger group" @click="handleModalDelete(item.itemId)">
            <Icon icon="mdi:delete-outline" class="text-lg text-red-600 group-hover:text-white" />
          </ButtonBase>
        </div>
      </li>
    </ul>
    <Empty v-if="!listItem.length && !isLoading" />
    <Loading v-if="isLoading" />
    <div class="grid w-full gap-3 ml-auto sm:w-56">
      <ButtonBase type="button" :isLoading="isLoading" class="button-primary" @click="handleModalAdd">
        Agregar
        <Icon icon="mdi:file-sign" class="text-lg" />
      </ButtonBase>
    </div>
  </div>
  <ModalAddItem v-if="openModalAdd" @close="handleModalAdd" />
  <ModalEditItem v-if="openModalEdit" @close="handleModalEdit" :itemId="itemId" />
  <ConfirmDelete v-if="openModalDelete" title="¿Estás seguro de eliminar este contenido?" subtitle="Solo se eliminará este item, NO el documento" @close="handleModalDelete" @confirm="deleteItem" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ItemService } from '@/services/item.service';
import { useStore } from '@/store/';
import { useRoute } from 'vue-router';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import { Icon } from '@iconify/vue';
import Empty from '@/components/Dashboard/Empty.vue';
import ModalAddItem from './ModalAddItem.vue';

const itemService = new ItemService();
const store = useStore();
const route = useRoute();
const isLoading = ref(false);

const listItem = ref([])
const isModalOpen = ref(false);

const handleModal = async () => {
  isModalOpen.value = !isModalOpen.value;
  await getItemsByDocument();
}

const getItemsByDocument = async () => {
  try {
    const response = await itemService.getItemsByDocument(route.params.documentId);
    listItem.value = [...response.data];
  } catch (error) {
    console.log(error);
    store.activeAlert('danger', error?.response?.data?.message || 'Ocurrió un error al obtener los items');
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
    <ul v-if="listItem.length" class="grid gap-5">
      <li v-for="item of listItem" :key="item.itemId" class="border border-dark-light p-5 rounded grid gap-3">
        <div v-html="item.content"></div>
        <div class="w-full flex gap-3 sm:w-28 ml-auto">
          <ButtonBase type="button" :isLoading="isLoading" class="button-outline-primary group">
            <Icon icon="mdi:pencil-outline" class="text-lg text-primary group-hover:text-white" />
          </ButtonBase>
          <ButtonBase type="button" :isLoading="isLoading" class="button-outline-danger group">
            <Icon icon="mdi:delete-outline" class="text-lg text-red-600 group-hover:text-white" />
          </ButtonBase>
        </div>
      </li>
    </ul>
    <Empty v-else />
    <div class="grid w-full gap-3 ml-auto sm:w-56">
      <ButtonBase type="button" :isLoading="isLoading" class="button-primary" @click="handleModal">
        Agregar
        <Icon icon="mdi:file-sign" class="text-lg" />
      </ButtonBase>
    </div>
  </div>
  <ModalAddItem v-if="isModalOpen" @close="handleModal" />
</template>

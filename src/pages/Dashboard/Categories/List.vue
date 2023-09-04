<script setup>
import { onMounted, ref } from 'vue';
import TitleBase from '@/components/Base/TitleBase.vue';
import ButtonBase from '@/components/Base/ButtonBase.vue';
import ModalAdd from './Components/ModalAdd.vue';
import ModalEdit from './Components/ModalEdit.vue';
import Empty from '@/components/Dashboard/Empty.vue';
import { Icon } from '@iconify/vue';
import { CategoryService } from '@/services/category.service';
import { useStore } from '@/store/'
import { formatSimpleDate } from '@/utils/handleDate';
import { useRouter } from 'vue-router';
import Loading from '@/components/Dashboard/Loading.vue';

const store = useStore();
const router = useRouter();
const categoryService = new CategoryService();
const categories = ref([]);
const categoryId = ref(null);
const openModalAdd = ref(false);
const openModalEdit = ref(false);
const isLoading = ref(false);

const handleModalAdd = () => {
  openModalAdd.value = !openModalAdd.value;
}
const handleModalEdit = (id = null) => {
  openModalEdit.value = !openModalEdit.value;
  if (id) {
    categoryId.value = id;
  }
}

const getCategories = async () => {
  try {
    isLoading.value = true;
    const response = await categoryService.getCategories();
    categories.value = response.data;
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener las categorías.');
  } finally {
    isLoading.value = false;
  }
}

const getNewCategory = (category) => {
  categories.value.unshift(category);
  handleModalAdd();
}

const updateCategory = (category) => {
  const index = categories.value.findIndex((cat) => cat.categoryId === category.categoryId);
  categories.value[index] = category;
  handleModalEdit();
}


onMounted(async () => {
  if (store.user.role !== 'ADMIN' && store.isAuth()) {
    store.activeAlert('danger', 'No tienes permisos para acceder a esta página.');
    router.replace({ name: 'home' })
  }
  await getCategories();
})
</script>

<template>
  <TitleBase :title="`Lista de categorías`" subtitle="Crea y edita categorías (Solo para administradores)" />
  <section>
    <div class="ml-auto sm:w-56">
      <ButtonBase @click="handleModalAdd" class="button-primary">
        AÑADIR
        <Icon icon="mdi:plus" class="text-lg" />
      </ButtonBase>
    </div>
    <div class="table" v-if="categories.length && !isLoading">
      <ul class="table-head grid-cols-[0.2fr,1fr,0.5fr,0.2fr]">
        <li>ID</li>
        <li>Tiítulo</li>
        <li>Fecha</li>
        <li></li>
      </ul>
      <ul v-for="cat of categories" :key="cat.categoryId" class="table-row grid-cols-[0.2fr,1fr,0.5fr,0.2fr]">
        <li>
          {{ cat.categoryId }}
        </li>
        <li>
          {{ cat.title }}
        </li>
        <li>{{ formatSimpleDate(cat.created_at) }}</li>
        <li>
          <Icon icon="mdi:pencil-outline" class="cursor-pointer text-2xl text-primary group-hover:text-white" @click="handleModalEdit(cat.categoryId)" />
        </li>
      </ul>
    </div>
    <Empty v-if="!categories.length && !isLoading" />
    <Loading v-if="isLoading" />
  </section>
  <ModalAdd v-if="openModalAdd" @close="handleModalAdd" @created="getNewCategory" />
  <ModalEdit v-if="openModalEdit" @close="handleModalEdit" :categoryId="categoryId" @updated="updateCategory" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Empty from '@/components/Dashboard/Empty.vue';
import { CommentService } from '@/services/comment.service';
import { useStore } from '@/store';
import { formatSimpleDate } from '@/utils/handleDate';
import { Icon } from '@iconify/vue';
import ConfirmDelete from '@/components/Dashboard/ConfirmDelete.vue';

const commentService = new CommentService();
const store = useStore();
const isActiveInput = ref(false);
const comment = ref('');
const openModalDelete = ref(false);
const commentId = ref(null);

const comments = ref([]);
const props = defineProps({
  documentId: {
    type: Number,
    required: true
  }
});

const handleInput = () => {
  isActiveInput.value = !isActiveInput.value;
}

const createDocument = async () => {
  try {
    const response = await commentService.createComment({ documentId: props.documentId, content: comment.value });
    const newComment = response.data;
    newComment.user = store.user;
    comments.value.unshift(newComment);
    handleInput();
    comment.value = '';
    store.activeAlert('success', 'Se agregó el comentario correctamente');
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo agregar el comentario');
  }
}

const handleModalDelete = (id = null) => {
  openModalDelete.value = !openModalDelete.value;
  if (id) {
    commentId.value = id;
  }
}

const getComments = async () => {
  try {
    const response = await commentService.getCommentsByDocument(props.documentId);
    comments.value = await response.data;
  } catch (error) {
    console.log(error)
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo obtener los comentarios');
  }
}

const deleteComment = async () => {
  try {
    await commentService.deleteComment(commentId.value);
    comments.value = comments.value.filter(comment => comment.commentId !== commentId.value);
    store.activeAlert('success', 'Se eliminó el comentario correctamente');
    handleModalDelete();
  } catch (error) {
    store.activeAlert('danger', error?.response?.data?.message || 'No se pudo eliminar el comentario');
  }
}

onMounted(async () => {
  await getComments();
});
</script>

<template>
  <section class="border-t border-dark-gray py-10">
    <div class="flex items-center justify-between">
      <h1>Comentarios</h1>
      <button v-if="!isActiveInput && store.isAuth()" type="button" class="button-primary w-8 h-8 flex items-center justify-center" @click="handleInput">
        <Icon icon="mdi:plus" class="text-lg" />
      </button>
    </div>
    <ul class="grid gap-5 mt-10">
      <li class="border border-dark-gray rounded p-5" v-if="isActiveInput">
        <textarea name="comment" id="comment" rows="10" v-model="comment" autofocus >
        </textarea>
        <button @click="createDocument" type="button" class="button-primary w-auto ml-auto mt-4 px-3 h-8 flex items-center justify-center" :disabled="!comment">
          Comentar
        </button>
      </li>
      <li v-for="comment of comments" class="border border-dark-gray rounded p-5" v-if="comments.length > 0">
        <div class="flex items-center justify-between">
          <section class="flex items-center gap-1">
            <Icon icon="mdi:account-circle-outline" class="text-[2.5rem]" />
            <h3>
              <span class="font-bold block -mb-2">{{ comment.user.name }}</span>
              <small class="text-dark-light text-sm">Publicado el: {{ formatSimpleDate(comment.createdAt) }}</small>
            </h3>
          </section>
          <button v-if="store.isAuth() && store.user.userId === comment.userId" type="button" class="button-danger w-8 h-8 flex items-center justify-center" @click="handleModalDelete(comment.commentId)">
            <Icon icon="mdi:delete-outline" class="text-lg" />
          </button>
        </div>
        <p class="mt-5 text-lg text-dark-light">
          {{ comment.content }}
        </p>
      </li>
      <Empty v-else />
    </ul>
  </section>
  <ConfirmDelete
    v-if="openModalDelete"
    title="¿Estás seguro de eliminar tu comentario?"
    subtitle="Esta acción no se puede deshacer"
    @close="handleModalDelete"
    @confirm="deleteComment"
  />
</template>

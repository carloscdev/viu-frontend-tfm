<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="border-t border-dark-gray py-10 fadeUp">
      <ul class="grid gap-10">
        <li v-for="item of items">
          <div class="item-content" v-html="item.content"></div>
        </li>
      </ul>
    </section>
</template>

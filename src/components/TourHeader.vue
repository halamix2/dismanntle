<script setup lang="ts">
const props = defineProps<{
  icon: string
  name: string
  number: number
}>()
</script>

<template>
  <div class="header">
    <img :src="props.icon" /> {{ props.name }} #{{ props.number }}
  </div>
</template>

<style scoped>
.header {
  height: 10em;
  background: linear-gradient(90deg, #cf7336, #cfa636);
}

.header img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>

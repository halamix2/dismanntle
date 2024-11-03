<script setup lang="ts">
const props = defineProps<{
  icon: string
  name: string
  number: number
  crappedTheBed: boolean
}>()
</script>

<template>
  <div class="header">
    <img :src="props.icon" /> {{ props.name }}
    <span v-if="!crappedTheBed">#</span>
    <span v-else class="text-red-darken-3">#</span>
    {{ props.number }}
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

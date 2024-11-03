<script setup lang="ts">
const props = defineProps<{
  icon: string
  name: string
  number: number
  crappedTheBed: boolean
}>()
</script>

<template>
  <div class="header d-flex flex-row text-center justify-center my-auto">
    <img :src="props.icon" class="w-25 my-1" />
    <p class="w-50 font-weight-bold my-auto">{{ props.name }}</p>
    <p class="w-25 font-weight-medium my-auto">
      <span v-if="!crappedTheBed">#</span>
      <span v-else class="text-red-darken-3">#</span>
      <span>{{ props.number }}</span>
    </p>
  </div>
</template>

<style scoped>
.header {
  height: 10em;
  background: linear-gradient(90deg, #cf7336, #cfa636);
  font-size: 10vh;
}

.header img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>

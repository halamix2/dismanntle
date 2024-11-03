<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { useBadgesStore } from '@/stores/badges'

const router = useRouter()

onMounted(() => {
  // TODO: check if map is in progress
  // check if there's one order in progres
  // Two Cities it is
  router.push('two-cities')
})
</script>

<template>
  <main>Hold on, loading the proper badge</main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// return to normal operation when key and steamid is available
const route = useRoute()
const router = useRouter()
onMounted(() => {
  if (route.query.key && (route.query.steamid || route.query.name)) {
    router.push({ path: '/', query: route.query })
  }
})
</script>

<template>
  <main>
    Missing one of the required parameters: key, and (steamid or name)
  </main>
</template>

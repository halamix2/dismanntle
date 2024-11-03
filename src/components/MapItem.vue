<script setup lang="ts">
import MissionItem from '@/components/MissionItem.vue'

const props = defineProps<{
  thumbnail: string
  name: string
  missions: string[]
}>()

function backgroundStyle(thumbnail: string) {
  return {
    background: `url(${thumbnail})`,
    'background-size': `cover`,
    'background-position': 'center',
  }
}
</script>

<template>
  <div class="Map">
    <div class="thumbnail" :style="backgroundStyle(props.thumbnail)" />
    <!-- <img :src="props.thumbnail" /> -->
    <div>
      <div>{{ props.name }}</div>
      <div class="missions">
        <div v-for="mission in props.missions" :key="mission">
          <MissionItem :mission="mission" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thumbnail {
  width: 100px;
  height: 200px;
}
</style>

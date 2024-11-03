<script setup lang="ts">
import MissionItem from '@/components/MissionItem.vue'

const props = defineProps<{
  thumbnail: string
  name: string
  missions: string[]
  badgeName: string
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
  <div class="d-flex flex-row align-stretch flex-fill">
    <div class="thumbnail" :style="backgroundStyle(props.thumbnail)" />
    <!-- <img :src="props.thumbnail" /> -->
    <div class="missions">
      <div class="header bg-grey-lighten-1 text-center font-weight-medium">
        {{ props.name }}
      </div>
      <div class="missions-height d-flex flex-column">
        <MissionItem
          v-for="mission in props.missions"
          :key="mission"
          :badgeName="props.badgeName"
          :mission="mission"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.thumbnail {
  width: 20%;
}
.missions {
  width: 80%;
}
.header {
  height: 20%;
  font-size: 6vh;
}
.missions-height {
  height: 80%;
}
</style>

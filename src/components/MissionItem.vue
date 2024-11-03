<script setup lang="ts">
import { ref, onMounted, onUpdated, watch } from 'vue'

import type { Store } from 'pinia'

import { useBadgesStore } from '@/stores/badges'
import { useSteamStore } from '@/stores/steam'

import { missionNames, missionBits } from '@/badge/types'
import type { Badge } from '@/badge/types'

enum Status {
  NotStarted = 0,
  InProgress = 1,
  Done = 2,
}

const steamStore = useSteamStore()
const badgesStore = useBadgesStore()

const missionName = ref('unknown_mission')
const status = ref(Status.NotStarted)
const props = defineProps<{
  badgeName: string
  mission: string
}>()

onMounted(() => {
  if (missionNames.has(props.mission)) {
    missionName.value = missionNames.get(props.mission)!
  } else {
    missionName.value = props.mission
  }
  updateStatus()
})

onUpdated(() => {
  updateStatus()
})

function updateStatus() {
  // if done in badge set done
  if (
    badgesStore.badges.has(props.badgeName) &&
    missionBits.has(props.mission) &&
    badgesStore.badges.get(props.badgeName)!.missionsBitmask[
      missionBits.get(props.mission)!
    ]
  ) {
    status.value = Status.Done
  } else if (steamStore.currentMission === props.mission) {
    status.value = Status.InProgress
  } else {
    status.value = Status.NotStarted
  }
}

watch(badgesStore.badges, updateStatus)

function getStatusClasses() {
  switch (status.value) {
    case Status.NotStarted:
      return ['bg-grey-darken-1', 'text-opacity-20']
    case Status.InProgress:
      return ['bg-green-lighten-1']
    case Status.Done:
      return ['bg-grey-darken-2']
  }
}
function getTextStatusClasses() {
  switch (status.value) {
    case Status.NotStarted:
      return []
    case Status.InProgress:
      return ['status-in-progress']
    case Status.Done:
      return ['opacity-50']
  }
}
// watch(steamStore.currentMission, updateStatus)
</script>
<template>
  <div class="h-100 d-flex flex-row text-size" :class="getStatusClasses()">
    <span v-if="status === Status.Done" class="text-grey-darken-4 my-auto mx-2"
      >✔</span
    >
    <span v-else class="opacity-0 my-auto mx-2">✘</span>
    <span class="my-auto" :class="getTextStatusClasses()">
      {{ missionName }}</span
    >
  </div>
</template>

<style scoped>
.text-size {
  font-size: 6vh;
}
/* .status-not-started {} */
.status-in-progress {
  text-shadow: 0.5vh 0.5vh 3vh #000000;
}
/* .status-done {} */
</style>

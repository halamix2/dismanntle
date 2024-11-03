<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

import type {Store} from 'pinia'

import { useBadgesStore } from '@/stores/badges'
import { useSteamStore } from '@/stores/steam'

import { missionNames } from '@/badge/types'

enum Status {
  NotStarted = 0,
  InProgress = 1,
  Done = 2
}

const steamStore = useSteamStore()
const badgesStore = useBadgesStore()

const missionName = ref('unknown_mission')
const status = ref(Status.NotStarted)
const props = defineProps<{
  badgeName: keyof Store<Badges>
  mission: string
}>()

onMounted(() => {
  if (missionNames.has(props.mission)) {
    missionName.value = missionNames.get(props.mission)!
  } else {
    missionName.value = props.mission
  }
})

// onUpdated(() => {
//   status.value = ""
// })

function updateStatus() {
  // if done in badge set done
  if(badgesStore.[props.badgeName]) {
    status.value = Status.Done
  } else if (steamStore.currentMission === props.mission) {
    status.value = Status.InProgress
  } else {
    status.value = Status.NotStarted
  }

}
</script>
<template>{{ status }} {{ missionName }}</template>

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

const StatusClass = ['notstarted', 'inprogress', 'done']

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
// watch(steamStore.currentMission, updateStatus)
</script>
<template>
  {{ status }}
  <span v-if="status === Status.Done" class="text-grey-darken-1">✔</span>
  {{ missionName }}
</template>

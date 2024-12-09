<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBadgesStore } from '@/stores/badges'
import { useSteamStore } from '@/stores/steam'

import { getSteamID } from '@/utils/vanity'
import { updateTourURL } from '@/utils/tour'

import TourHeader from '@/components/TourHeader.vue'
import MapItem from '@/components/MapItem.vue'

import icon from '@/assets/badges/two_cities.png'
import thumbnailMannhattan from '@/assets/maps/mannhattan.png'
import thumbnailRottenburg from '@/assets/maps/rottenburg.png'

const defaultTitle = 'Two Cities'
const badgeName = 'badgeAdvanced3'

const router = useRouter()
const route = useRoute()
const key = route.query.key!.toString()
const steamStore = useSteamStore()
const badgesStore = useBadgesStore()
let steamID = ''
let updateIntervalID = 0
let locked = false
const tourHeaderTitle = ref(defaultTitle)
const crappedTheBed = ref(true)
const currentBadge = badgesStore.badges.get(badgeName)!

async function updateLogic(badgeName: string) {
  if (!locked) {
    locked = true
    let crapped = false
    try {
      await steamStore.updateCurrentMission(key, steamID)
      await badgesStore.updateBadges(key, steamID)
    } catch (e) {
      console.log('ignoring Steam API error for now...', e)
      crapped = true
    }
    crappedTheBed.value = crapped
    await updateTourURL(router, steamStore.currentMission)

    if (!badgesStore.badges.has(badgeName)) {
      console.log('badge not found!', badgeName, badgesStore.badges)
      return
    }
    if (badgesStore.badges.get(badgeName)!.customName) {
      tourHeaderTitle.value = badgesStore.badges.get(badgeName)!.customName!
    } else {
      tourHeaderTitle.value = defaultTitle
    }
    locked = false
  }
}

onMounted(async () => {
  steamID = await getSteamID(key, route)
  updateLogic(badgeName)

  updateIntervalID = window.setInterval(
    updateLogic,
    import.meta.env.VITE_REFRESH_INTERVAL,
    badgeName,
  )
})

onBeforeUnmount(() => {
  window.clearInterval(updateIntervalID)
})
</script>

<template>
  <TourHeader
    :style="{ height: '16%' }"
    :icon="icon"
    :name="tourHeaderTitle"
    :number="currentBadge.completedTours"
    :crappedTheBed="crappedTheBed"
  />
  <div class="d-flex flex-column" :style="{ height: '84%' }">
    <MapItem
      :thumbnail="thumbnailMannhattan"
      :name="'Mannhattan'"
      :missions="['mvm_mannhattan_advanced1', 'mvm_mannhattan_advanced2']"
      :badgeName="badgeName"
    />
    <MapItem
      :thumbnail="thumbnailRottenburg"
      :name="'Rottenburg'"
      :missions="['mvm_rottenburg_advanced1', 'mvm_rottenburg_advanced2']"
      :badgeName="badgeName"
    />
  </div>
</template>

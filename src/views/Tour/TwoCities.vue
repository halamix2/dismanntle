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

const router = useRouter()
const route = useRoute()
const key = route.query.key!.toString()
const steamStore = useSteamStore()
const badgesStore = useBadgesStore()
let steamID = ''
let updateInterval = 0
let locked = false
const tourHeaderTitle = ref('Two Cities')

async function updateLogic() {
  if (!locked) {
    locked = true
    try {
      await steamStore.updateCurrentMission(key, steamID)
      await badgesStore.updateBadges(key, steamID)
    } catch (e) {
      console.log('ignoring Steam API error for now...', e)
    }
    await updateTourURL(router, steamStore.currentMission)
    if (badgesStore.badgeAdvanced3.customName) {
      tourHeaderTitle.value = badgesStore.badgeAdvanced3.customName
    } else {
      tourHeaderTitle.value = 'Two Cities'
    }
    locked = false
  }
}

onMounted(async () => {
  steamID = await getSteamID(key, route)
  updateLogic()

  updateInterval = window.setInterval(
    updateLogic,
    import.meta.env.VITE_REFRESH_INTERVAL,
  )
})

onBeforeUnmount(() => {
  window.clearInterval(updateInterval)
})

// header
//  badge name  #tour
// map
// thumbnail
// name
// missions - Component -

/* mission =
{
  name
  mapName
  badgeItem
  currentMap
}
*/
</script>

<template>
  <!-- Two Cities: <br />  {{ badgesStore.badgeAdvanced3 }}  Empire -->
  <TourHeader
    :icon="icon"
    :name="tourHeaderTitle"
    :number="badgesStore.badgeAdvanced3.completedTours"
  />
  <MapItem
    :thumbnail="thumbnailMannhattan"
    :name="'Mannhattan'"
    :missions="[]"
  />
  <MapItem
    :thumbnail="thumbnailRottenburg"
    :name="'Rottenburg'"
    :missions="[]"
  />
</template>

import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { BadgeIDs } from '@/badge/types'
import type { ItemsList, Item, Badge } from '@/badge/types'

const mvm_completed_challenges_bitmask = 386

function createEmptyBadge(): Badge {
  return {
    id: '0',
    completedTours: 0,
    missionsBitmask: [],
  }
}

export const useBadgesStore = defineStore('badges', () => {
  // I'm too dum to get Map to be reative
  const badges: Map<string, Badge> = reactive(
    new Map<string, Badge>([
      ['badgeIntermediate1', createEmptyBadge()],
      ['badgeAdvanced1', createEmptyBadge()],
      ['badgeAdvanced2', createEmptyBadge()],
      ['badgeAdvanced3', createEmptyBadge()],
      ['badgeExpert1', createEmptyBadge()],
    ]),
  )
  // const updateTime = ref(Date.now())
  async function updateBadges(key: string, steamID: string) {
    const badgeItems = await getBadges(key, steamID)
    if (badgeItems.length == 0) {
      throw new Error('Steam API shit itself again')
    }

    badgeItems.forEach(item => {
      const tmp = convertItem(item)
      switch (item.defindex) {
        case BadgeIDs.tour_intermediate1:
          badges.set('badgeIntermediate1', tmp)
          break
        case BadgeIDs.tour_advanced1:
          badges.set('badgeAdvanced1', tmp)
          break
        case BadgeIDs.tour_advanced2:
          badges.set('badgeAdvanced2', tmp)
          break
        case BadgeIDs.tour_advanced3:
          badges.set('badgeAdvanced3', tmp)
          break
        case BadgeIDs.tour_expert1:
          badges.set('badgeExpert1', tmp)
          break
      }
    })
  }
  return {
    badges,
    updateBadges,
  }
})

function convertItem(item: Item): Badge {
  const badge: Badge = {
    id: BadgeIDs[item.defindex],
    customName: item.custom_name,
    completedTours: item.level,
    missionsBitmask: Array(17).fill(false),
  }
  // bitmask value to array
  const bitmask = item.attributes.find(
    attrib => attrib.defindex == mvm_completed_challenges_bitmask,
  )
  if (!bitmask) {
    return badge
  }
  badge.missionsBitmask.forEach((el, index, bitmaskArray) => {
    bitmaskArray[index] = Boolean((bitmask.value >> index) & 1).valueOf()
  })

  return badge
}

async function getBadges(key: string, steamID: string): Promise<Item[]> {
  const url =
    import.meta.env.VITE_BASE_API_URL +
    'IEconItems_440/GetPlayerItems/v0001/?key=' +
    key +
    '&steamid=' +
    steamID
  try {
    const response = await fetch(url)
    if (!response.ok) {
      // TODO: better error handling?
      return []
    }
    const responseJson: ItemsList = await response.json()
    return responseJson.result.items.filter(i => {
      return [870, 726, 975, 1066, 871].includes(i.defindex)
    })
  } catch {
    return []
  }
}

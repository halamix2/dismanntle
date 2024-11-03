import type { Router } from 'vue-router'

import {
  tourItermediate1Maps,
  tourAdvanced1Maps,
  tourAdvanced2Maps,
  tourAdvanced3Maps,
  tourExpert1Maps,
} from '@/badge/types'

function updateTourURL(router: Router, currentMission: string) {
  // check what tour the current map belongs to and jump there if we're not there already
  const currentPath = router.currentRoute.value.path
  if (currentMission === '') {
    return
  }
  console.log('route', currentPath, currentMission)
  if (tourAdvanced3Maps.includes(currentMission)) {
    console.log('twooooo')
  } else {
    console.log('notooo')
  }

  if (
    tourItermediate1Maps.includes(currentMission) &&
    currentPath != '/oil-spill'
  ) {
    router.push('oil-spill')
  } else if (
    tourAdvanced1Maps.includes(currentMission) &&
    currentPath != '/steel-trap'
  ) {
    router.push('steel-trap')
  } else if (
    tourAdvanced2Maps.includes(currentMission) &&
    currentPath != '/mecha-engine'
  ) {
    router.push('mecha-engine')
  } else if (
    tourAdvanced3Maps.includes(currentMission) &&
    currentPath != '/two-cities'
  ) {
    console.log('two')
    router.push('two-cities')
  } else if (
    tourExpert1Maps.includes(currentMission) &&
    currentPath != '/gear-grinder'
  ) {
    router.push('gear-grinder')
  }
}

export { updateTourURL }

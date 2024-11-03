import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import LoadingView from '../views/LoadingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoadingView,
    },
    {
      path: '/oil-spill',
      name: 'Oil Spill',
      component: () => import('../views/Tour/OilSpill.vue'),
    },
    {
      path: '/steel-trap',
      name: 'Steel Trap',
      component: () => import('../views/Tour/SteelTrap.vue'),
    },
    {
      path: '/mecha-engine',
      name: 'Mecha Engine',
      component: () => import('../views/Tour/MechaEngine.vue'),
    },
    {
      path: '/gear-grinder',
      name: 'Gear Grinder',
      component: () => import('../views/Tour/GearGrinder.vue'),
    },
    {
      path: '/two-cities',
      name: 'Two Cities',
      component: () => import('../views/Tour/TwoCities.vue'),
    },
    {
      path: '/missing-params',
      name: 'Missing Params',
      component: () => import('../views/MissingParams.vue'),
    },
  ],
})

function missingRequired(route: RouteLocationNormalizedGeneric): boolean {
  if (!route.query.key || (!route.query.steamid && !route.query.name)) {
    return true
  }
  return false
}

function hasQueryParams(route: RouteLocationNormalizedGeneric): boolean {
  return Object.keys(route.query).length > 0
}

// pass previous query params by default
router.beforeEach((to, from, next) => {
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    if (missingRequired(from) && from.name != 'Missing Params') {
      next({ name: 'Missing Params' })
    }
    next({ name: to.name, query: from.query })
  } else {
    if (missingRequired(to) && to.name != 'Missing Params') {
      next({ name: 'Missing Params' })
    }
    next()
  }
})

export default router

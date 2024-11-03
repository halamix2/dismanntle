import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

type VanityResponse = {
  response: {
    steamid: string
    success: number
  }
}

async function vanityToID(key: string, vanityurl: string): Promise<string> {
  const url =
    import.meta.env.VITE_BASE_API_URL +
    'ISteamUser/ResolveVanityURL/v0001/?key=' +
    key +
    '&vanityurl=' +
    vanityurl
  try {
    const response = await fetch(url)
    if (!response.ok) {
      // TODO: better error handling?
      return ''
    }
    const responseJson: VanityResponse = await response.json()
    if (responseJson.response.success !== 1) {
      return ''
    }
    return responseJson.response.steamid
  } catch {
    // TODO: proper error handling
    return ''
  }
}

async function getSteamID(
  key: string,
  route: RouteLocationNormalizedLoadedGeneric,
): Promise<string> {
  // prefer steamid
  if (route.query.steamid) {
    return route.query.steamid!.toString()
  } else if (route.query.name) {
    return await vanityToID(key, route.query.name.toString())
  }
  return ''
}

export { getSteamID }

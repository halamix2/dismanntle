import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSteamStore = defineStore('steam', () => {
  const currentMission = ref('')
  const currentServerID = ref('')

  async function updateCurrentMission(key: string, steamID: string) {
    // get user
    const userServer = await getUserServer(key, steamID)

    // get server if server ID has changed
    if (userServer !== currentServerID.value) {
      currentServerID.value = userServer

      if (currentServerID.value !== '') {
        currentMission.value = await getServerMap(key, currentServerID.value)
      } else {
        currentMission.value = ''
      }
    }
  }
  return { currentMission, currentServerID, updateCurrentMission }
})

type UserResponseList = {
  response: {
    players: UserResponse[]
  }
}

type UserResponse = {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  commentpermission: number
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  lastlogoff: number
  personastate: number
  primaryclanid: string
  timecreated: number
  personastateflags: number
  gameserverip?: string
  gameserversteamid?: string
  gameextrainfo?: string
  gameid?: string
  loccountrycode: string
}

async function getUserServer(key: string, steamID: string): Promise<string> {
  const url =
    import.meta.env.VITE_BASE_API_URL +
    'ISteamUser/GetPlayerSummaries/v0002/?key=' +
    key +
    '&steamids=' +
    steamID
  try {
    const response = await fetch(url)
    if (!response.ok) {
      // TODO: better error handling?
      return ''
    }
    const responseJson: UserResponseList = await response.json()
    if (responseJson.response.players.length !== 1) {
      return ''
    }
    if (
      typeof responseJson.response.players[0].gameserversteamid != 'undefined'
    ) {
      return responseJson.response.players[0].gameserversteamid
    }
  } catch {
    // TODO: proper error handling
    return ''
  }
  return ''
}

type ServerResponseList = {
  response: {
    servers: ServerResponse[]
  }
}

type ServerResponse = {
  addr: string
  gameport: number
  steamid: string
  name: string
  appid: number
  gamedir: string
  version: string
  product: string
  region: number
  players: number
  max_players: number
  bots: number
  map: string
  secure: boolean
  dedicated: boolean
  os: string
  gametype: string
}

async function getServerMap(key: string, steamID: string): Promise<string> {
  const url =
    import.meta.env.VITE_BASE_API_URL +
    'IGameServersService/GetServerList/v1/?key=' +
    key +
    '&limit=1&filter=\\steamid\\' +
    steamID
  try {
    const response = await fetch(url)
    if (!response.ok) {
      // TODO: better error handling?
      return ''
    }
    const responseJson: ServerResponseList = await response.json()
    if (responseJson.response.servers.length !== 1) {
      return ''
    }
    if (typeof responseJson.response.servers[0].map != 'undefined') {
      return responseJson.response.servers[0].map
    }
  } catch {
    // TODO: proper error handling
    return ''
  }
  return ''
}

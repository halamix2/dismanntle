enum BadgeIDs {
  tour_advanced1 = 726,
  tour_intermediate1 = 870,
  tour_expert1 = 871,
  tour_advanced2 = 975,
  tour_advanced3 = 1066,
}

type ItemsList = {
  result: {
    status: number
    num_backpack_slots: number
    items: Item[]
  }
}

type Item = {
  id: number
  original_id: number
  defindex: number
  level: number
  quality: number
  inventory: number
  quantity: number
  origin: number
  custom_name?: string
  custom_desc?: string
  flag_cannot_trade: boolean
  attributes: ItemAttribute[]
}

type ItemAttribute = {
  defindex: number
  value: number
  float_value: number
}

interface Badge {
  // tour_intermediate1, tour_advanced1, tour_advanced2, tour_advanced3, tour_expert1
  id: string
  customName?: string
  completedTours: number
  // customDescription: string
  // ordered array of finished missions, decoded bitfield
  missionsBitmask: boolean[]
}

const tourItermediate1Maps = [
  'mvm_coaltown_intermediate',
  'mvm_coaltown_intermediate2',
  'mvm_decoy_intermediate',
  'mvm_decoy_intermediate2',
  'mvm_mannworks_intermediate',
  'mvm_mannworks_intermediate2',
]

const tourAdvanced1Maps = [
  'mvm_coaltown_advanced',
  'mvm_coaltown_advanced2',
  'mvm_decoy_advanced',
  'mvm_decoy_advanced2',
  'mvm_mannworks_advanced',
  'mvm_mannworks_ironman',
]

const tourAdvanced2Maps = [
  'mvm_bigrock_advanced1',
  'mvm_bigrock_advanced2',
  'mvm_decoy_advanced3',
]

const tourAdvanced3Maps = [
  'mvm_mannhattan_advanced1',
  'mvm_mannhattan_advanced2',
  'mvm_rottenburg_advanced1',
  'mvm_rottenburg_advanced2',
]

const tourExpert1Maps = [
  'mvm_coaltown_expert1',
  'mvm_decoy_expert1',
  'mvm_mannworks_expert1',
]
const missionBits = new Map<string, number>([
  ['mvm_coaltown_intermediate', 1],
  ['mvm_coaltown_intermediate2', 2],
  ['mvm_decoy_intermediate', 3],
  ['mvm_decoy_intermediate2', 4],
  ['mvm_mannworks_intermediate', 5],
  ['mvm_mannworks_intermediate2', 6],
  ['mvm_coaltown_advanced', 1],
  ['mvm_coaltown_advanced2', 2],
  ['mvm_decoy_advanced', 8],
  ['mvm_decoy_advanced2', 9],
  ['mvm_mannworks_advanced', 15],
  ['mvm_mannworks_ironman', 16],
  ['mvm_bigrock_advanced1', 1],
  ['mvm_bigrock_advanced2', 2],
  ['mvm_decoy_advanced3', 3],
  ['mvm_mannhattan_advanced1', 1],
  ['mvm_mannhattan_advanced2', 2],
  ['mvm_rottenburg_advanced1', 3],
  ['mvm_rottenburg_advanced2', 4],
  ['mvm_coaltown_expert1', 1],
  ['mvm_decoy_expert1', 2],
  ['mvm_mannworks_expert1', 3],
])

const missionNames = new Map<string, string>([
  ['mvm_coaltown_intermediate', 'Mecha Engine'],
  ['mvm_coaltown_intermediate2', 'Quarry'],
  ['mvm_decoy_intermediate', "Doe's Doom"],
  ['mvm_decoy_intermediate2', 'Day of Wreckening'],
  ['mvm_mannworks_intermediate', 'Mean Machines'],
  ['mvm_mannworks_intermediate2', 'Mannhunt'],
  // advanced 1 / Steel Trap
  ['mvm_coaltown_advanced', 'Ctrl+Alt+Destruction'],
  ['mvm_coaltown_advanced2', 'CPU Slaughter'],
  ['mvm_decoy_advanced', 'Disk Deletion'],
  ['mvm_decoy_advanced2', 'Data Demolition'],
  ['mvm_mannworks_advanced', 'Machine Massacre'],
  ['mvm_mannworks_ironman', 'Mech Mutilation'],
  // advanced 2 / Mecha Engine
  ['mvm_bigrock_advanced1', 'Broken Parts'],
  ['mvm_bigrock_advanced2', 'Bone Shaker'],
  ['mvm_decoy_advanced3', 'Disintegration'],
  // advanced 3 / Two Cities
  ['mvm_mannhattan_advanced1', 'Empire Escalation'],
  ['mvm_mannhattan_advanced2', 'Metro Malice'],
  ['mvm_rottenburg_advanced1', 'Hamlet Hostility'],
  ['mvm_rottenburg_advanced2', 'Bavarian Botbash'],
  // expert 1 / Gear Grinder
  ['mvm_coaltown_expert1', 'Cataclysm'],
  ['mvm_decoy_expert1', 'Desperation'],
  ['mvm_mannworks_expert1', 'Mannslaughter'],
])

export {
  BadgeIDs,
  tourItermediate1Maps,
  tourAdvanced1Maps,
  tourAdvanced2Maps,
  tourAdvanced3Maps,
  tourExpert1Maps,
  missionBits,
  missionNames,
}

export type { ItemsList, Item, ItemAttribute, Badge }

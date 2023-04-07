export type ResourceRetailInfo = {
  dbLetter: number
  averagePrice: number
  saturation: number
}

export type ResourceEncyclopedia = {
  averageRetailPrice: number
  baseSalary: number
  db_letter: number
  exchangeTradable: boolean
  image: string
  // improvesQualityOf:
  marketSaturation: number
  marketSaturationLabel: string
  name: string
  // neededFor: 
  producedAnHour: number
  producedAt: string
  // producedFrom:
  realmAvailable: boolean
  research: boolean
  // retailData:
  retailable: boolean
  soldAt: string
  // soldAtRestaurant: 
  storeBaseSalary: number
  transportNeeded: number
  transportation: number
}

export type Seller = {
  id: number
  company: string
  realmId: number
  logo: string
  certificates: number
  contest_wins: number
  npc: boolean
  courseId: number | null
  ip: string
}

export type ResourceOffer = {
  id: number
  kind: number
  quantity: number
  quality: number
  price: number
  seller: Seller
  posted: string
  fees: number
}

export type ResourceData = {
  dbLetter: number
  name: string
  averagePrice: number
  wage: number
  saturation: number
  saturationFinal: number
  quality: number
  price: number
  t: number
}

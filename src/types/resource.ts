export type ResourceRetailInfo = {
  dbLetter: number
  averagePrice: number
  saturation: number
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
  averagePrice: number
  wage: number
  saturation: number
  saturationFinal: number
  quality: number
  price: number
  t: number
}

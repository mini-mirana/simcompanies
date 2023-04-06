export const calculateSaturation = (S: number, Q: number) => {
  return Math.max(-0.38, S - 0.24 * Q)
}

export const calculateRetailDemand = (
  A: number,
  B: number,
  C: number,
  D: number,
  E: number,
  Price: number,
  S: number
) => {
  return Math.pow(Price * A + (S - 0.5) / B + C, 2) * D + E
}

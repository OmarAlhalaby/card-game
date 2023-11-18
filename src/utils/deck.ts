import type { Card } from '@/types/Card'

const suits = ['@', '#', '^', '*']
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
let index = 0

export const generateDeck = () => {
  const deck: Array<Card> = ranks.flatMap((rank) =>
    suits.map((suit) => ({ id: index++, suit, rank }))
  )
  return deck
}

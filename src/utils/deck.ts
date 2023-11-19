import type { Card } from '@/types/Card'

const suits = ['@', '#', '^', '*']
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
let indx: number = 0

/**
 * generate cards game
 * @returns Array
 */
export const generateDeck = () => {
  const deck: Array<Card> = ranks.flatMap((rank: string) =>
    suits.map((suit: string) => ({ id: indx++, suit, rank }))
  )
  return deck
}

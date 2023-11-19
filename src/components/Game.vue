<script setup lang="ts">
import { generateDeck } from '@/utils/deck'
import MyCard from './MyCard.vue'
import type { Winner } from '../types/Winner'
import type { Card } from '@/types/Card'
import { ref } from 'vue';

let cards = ref<Array<Card>>(generateDeck())
let players: Array<Array<Card>> = []
let winner: Winner = { index: 0, cards: [] }
let result: Card[]

const isRandomize = ref(false)
const isDistribute = ref(false)
const isWinnerSelected = ref(false)

const reset = () => {
  isRandomize.value = false
  isDistribute.value = false
  isWinnerSelected.value = false

  cards.value = generateDeck()
  players = []
  winner = { index: 0, cards: [] }
  result = []
}

const randomize = () => {
  // Shuffle the cards array by using the Fisher-Yates algorithm 
  for (let i = cards.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards.value[i], cards.value[j]] = [cards.value[j], cards.value[i]];
  }

  isRandomize.value = true
}

const distribute = () => {

  // Initiate the players array
  const initialValue = Array.from({ length: 4 }, () => []);

  isDistribute.value = true

  // Distribute all cards to 4 players in sequence 
  players = cards.value.reduce((acc: Array<Card[]>, card, index) => {
    const playerIndex: number = index % 4;
    acc[playerIndex].push(card)
    return acc
  }, initialValue)
}

const findTheChamp = () => {
  const playerCount = players.length;
  const maxRepetitionsArray: Array<number> = new Array(playerCount).fill(0)
  const filteredPlayersCards: Array<Card[]> = new Array(playerCount)

  isWinnerSelected.value = true

  // Get the highest number of cards with same alphanumeric part 
  for (let i = 0; i < playerCount; i++) {
    const player: Card[] = players[i];
    const cardsRepetitions: any = {};

    // Get the card repetitions for each player
    for (const card of player) {
      const rank = card.rank;
      cardsRepetitions[rank] = (cardsRepetitions[rank] || 0) + 1;
    }

    // Get the highest repetitions only for each player
    const maxRepetition = Math.max(...Object.values(cardsRepetitions as object));
    maxRepetitionsArray[i] = maxRepetition

    // Get the highest alphanumeric cards with the repetitions for each player
    const highestCardsRepetitions = Object.entries(cardsRepetitions)
      .filter(([key, value]) => value === maxRepetition)

    // Convert to object
    const obj = Object.fromEntries(highestCardsRepetitions)

    // Get the highest cards for each player and sort on the suit (symbol) 
    filteredPlayersCards[i] = player.filter((e: Card) => obj[e.rank])
      .sort((a: Card, b: Card) => b.id - a.id)
  }

  // Get the maximum repetitions for all player
  const maxPlayersRepetitions = Math.max(...maxRepetitionsArray);

  // Get the player id with the hightest repetitions only
  const maxIds: Array<number> = maxRepetitionsArray.reduce((acc: number[], max: number, index: number) => {
    if (max === maxPlayersRepetitions) {
      acc.push(index);
    }
    return acc;
  }, [])

  // Get the players with the hightest repetitions only
  const maxPlayers: Array<Winner> = maxIds.map((index: number) => ({ index, cards: filteredPlayersCards[index] }))

  // Get the winner
  winner = maxPlayers.reduce((acc: Winner, element: Winner) =>
    acc?.cards[0]['id'] < element.cards[0]['id'] ? element : acc)

  // Get the winning set  
  result = winner.cards.slice(0, maxPlayersRepetitions)
}

</script>

<template>
  <button @click="reset" :disabled="!isRandomize">{{ isWinnerSelected ? 'Replay' : 'Reset' }}</button>
  <button @click="randomize" :disabled="isDistribute">Shuffle</button>
  <button @click="distribute" :disabled="!isRandomize || isDistribute">Play</button>

  <div v-if="!isDistribute" class="deck">
    <MyCard v-for="(card, index) in cards" :key="index" :suit="card.suit" :rank="card.rank" />
  </div>

  <template v-else>
    <button @click="findTheChamp" :disabled="isWinnerSelected">Who Won</button>
    <div v-for="(id, indx) in 4" class="game">
      <h3>Player{{ id }}:</h3>
      <MyCard v-for="(player, index) in players[indx]" :key="index" :suit="player.suit" :rank="player.rank" />
    </div>
  </template>

  <div v-if="isWinnerSelected" class="game" style="justify-content:center">
    <div style="padding-top: 30px;">
      <h3>Player {{ winner.index + 1 }} won, and the winning set is</h3>
    </div>
    <MyCard v-for="(card, index) in result" :key="index" :suit="card.suit" :rank="card.rank" />
  </div>
</template>
<script setup lang="ts">
import { generateDeck } from '@/utils/deck'
import MyCard from './MyCard.vue'
import type { Player } from '../types/Player'
import type { Card } from '@/types/Card'
import { ref } from 'vue';

const cards = ref<Array<Card>>(generateDeck())
let players: any = []

const isDistribute = ref(false)

const randomize = () => {
  for (let i = cards.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards.value[i], cards.value[j]] = [cards.value[j], cards.value[i]];
  }
}

const distribute = () => {
  const initialValue = Array.from({ length: 4 }, () => []);
  isDistribute.value = true
  // Distribute ALL cards to players in sequence using reduce
  players = cards.value.reduce((acc: any, card, index) => {
    const playerIndex = index % 4;
    acc[playerIndex].push(card)
    return acc
  }, initialValue)

  let lookup: any = {}
  let index = 0
  // let maxKey: any
  let newPlayer: any = []
  players.forEach((player: any) => {
    lookup = player.reduce((a: any, e: any) => {
      a[e.rank] = ++a[e.rank] || 0;
      return a;
    }, {});
    const maxKey = Object.values(lookup).reduce((a: any, b: any) => a < b ? b : a);
    const keysWithValueOne = Object.entries(lookup).filter(([key, value]) => lookup[key] === maxKey);
    const obj = Object.fromEntries(keysWithValueOne)
    console.log(lookup, maxKey, keysWithValueOne, obj)
    newPlayer[index] = player.filter((e: any) => obj[e.rank])
    index++
  });

  console.log(newPlayer)

}

</script>


<template>
  <button @click="randomize">Shuffle</button>
  <button @click="distribute">Distribute</button>
  <div v-if="isDistribute" class="game">
    player1:
    <MyCard v-for="(player, index) in players[0]" :key="index" :suit="player.suit" :rank="player.rank" />
    player2:
    <MyCard v-for="(player, index) in players[1]" :key="index" :suit="player.suit" :rank="player.rank" />
    player3:
    <MyCard v-for="(player, index) in players[2]" :key="index" :suit="player.suit" :rank="player.rank" />
    player4:
    <MyCard v-for="(player, index) in players[3]" :key="index" :suit="player.suit" :rank="player.rank" />
    <!-- <MyCard v-for="(card, index) in cards" :key="index" :suit="card.suit" :rank="card.rank" /> -->
  </div>
  <div v-else class="deck">
    <MyCard v-for="(card, index) in cards" :key="index" :suit="card.suit" :rank="card.rank" />
  </div>
</template>

<style scoped>
.deck {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
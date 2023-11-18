<script setup lang="ts">

defineProps(['suit', 'rank'])
</script>

<template>
  <div class="card">
    <div class="card-inner">
      <div class="card-suit">{{ suit }}</div>
      <div class="card-rank">{{ rank }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: table-cell;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-suit {
  font-size: 24px;
}

.card-rank {
  font-size: 24px;
}
</style>

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

</style>

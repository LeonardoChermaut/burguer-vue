<script lang="ts">
import DashboardComponent from '../components/Dashboard.vue';

export default {
  name: 'OrderView',
  components: {
    DashboardComponent,
  },
}
</script>

<template>
    <div id="main-order-container">
      <h1>Gerenciar de Pedidos</h1>
      <DashboardComponent />
    </div>
  </template>

<style scoped>
#main-order-container {
  width: 100%;
  margin-top: 2rem;
  align-items: center;
  height: calc(100vh - 6.25rem);
}
</style>
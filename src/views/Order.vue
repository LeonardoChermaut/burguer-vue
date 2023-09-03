<script lang="ts">
import DashboardComponent from '../components/Dashboard.vue';

export default {
  name: 'OrderView',
  components: {
    DashboardComponent
  }
  
}
</script>

<template>
    <div id="maint-order-container">
      <h1>Gerenciar de Pedidos</h1>
      <DashboardComponent />
    </div>
  </template>

  <style scoped></style>
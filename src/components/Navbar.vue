<template>
  <div id="main-nav-container">
    <router-link to="/" id="nav-burguer-logo">
      <img id="burguer-logo" :src="src" :alt="alt" />
    </router-link>
    <router-link to="/">Inicio</router-link> |
    <router-link to="/pedidos">Pedidos</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NavbarComponent',
  props: ['src', 'alt']
}
</script>

<style scoped>
  #main-nav-container {
    background-color: #222;
    border-bottom: 0.25rem solid #111;
    padding: 0.938rem 3.125rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  #main-nav-container #nav-burguer-logo {
    margin: auto;
    margin-left: 0;
  }

  #burguer-logo {
    width: 30%;
    height: 30%;
  }

  #main-nav-container a {
    color: #fcba03;
    text-decoration: none;
    margin: 0.75rem;
    transition: 0.5s;
  }

  #main-nav-container a:hover {
    color: #fff;
  }
</style>
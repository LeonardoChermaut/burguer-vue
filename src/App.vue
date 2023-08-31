<template>
  <NavbarComponent :src="pathLogoBurguer" :alt="descriptionLogoBurguer" />
  <router-view />
  <FooterComponent />
</template>

<script lang="ts">
import NavbarComponent from './components/Navbar.vue'
import FooterComponent from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  },
  data() {
    return {
      pathLogoBurguer: '../public/img/logo.png',
      descriptionLogoBurguer: 'Logo do site hamburgueria'
    }
  }
}
</script>

<style>
  @import './reset.global.style.css';

  .main-home-conteiner {
    margin: 0.625rem;
    min-height: 15.625rem;
  }

  h1 {
    text-align: center;
    font-size: 2.625rem;
    margin-top: 2.625rem;
    margin-bottom: 1.875rem;
    color: #222;
  }
</style>

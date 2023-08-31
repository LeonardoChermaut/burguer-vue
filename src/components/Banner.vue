<template>
    <div id="main-banner-conteiner">
        <h1>Make Your Burger</h1>
    </div>
</template>
<script lang="ts">

export default {
    name: 'BannerLogoBurguerComponent'
}

</script>

<style scoped>

#main-banner-conteiner {
    background-image: url('../../public/img/burger.jpg');
    background-position: 0 -15.625rem;
    background-size: cover;
    height: 31.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  #main-banner-conteiner h1 {
    color: #FFF;
    text-align: center;
    font-size: 3.75rem;
    background-color: #222;
    padding: 1.25rem 2.5rem;
  }

</style>

<template>
    <BannerLogoBurguerComponent />
    <div class="main-home-conteiner">
        <h1>Monte seu Hamburguer</h1>
        <FormOrderComponent />
    </div>
</template>
<script lang="ts">
import BannerLogoBurguerComponent from '../components/Banner.vue';
import FormOrderComponent from "../components/FormOrder.vue"

export default {
    name: 'HomeView',
    components: {
        BannerLogoBurguerComponent,
        FormOrderComponent
    }

}
</script>

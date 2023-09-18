<template>
    <footer id="footer">
      <p>Make Your Burguer &copy; 2023</p>
    </footer>
  </template>
  
  <script lang="ts">
  export default {
    name: 'FooterComponent'
  }
  </script>
  
  <style scoped>
    #footer {
      width: 100%;
      display: flex;
      color: #FCBA03;
      height: 6.25rem;
      background-color: #222;
      border-top: 0.25rem solid #111;
      align-items: center;
      justify-content: center;
      bottom: 0; left: 0; right: 0;
      position: relative;
    }

</style>
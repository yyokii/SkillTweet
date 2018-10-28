<template>
  <!-- https://stackoverflow.com/questions/50003226/vuetify-colors-are-not-showing-up -->
  <v-app>
    <div id="app">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  text-align: center;
}
</style>

<template>
  <!-- https://stackoverflow.com/questions/50003226/vuetify-colors-are-not-showing-up -->
  <v-app>
    <v-toolbar class="white">
      <router-link to="/" style="cursor: pointer">
        <img to="/" src="./assets/logo.png" alt="Skill App" height="80">
      </router-link>
    </v-toolbar>

    <div id="app">
      <router-view/>
    </div>

    <v-footer
      height="auto"
      color="primary lighten-1"
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-flex
          primary
          py-3
          text-xs-center
          white--text
          xs12
        >
          &copy;2018 — <strong>yyokii</strong>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      icons: [
        'fab fa-twitter',
        'fas fa-envelope'
      ]
    }
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>

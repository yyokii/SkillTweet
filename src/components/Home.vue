<template>
    <v-container>
      <v-layout column wrap>
        <h1> Home </h1>
        <!-- https://forum.vuejs.org/t/how-to-use-router-link-correctly-with-vuetify-buttons/31256/2 -->
        <v-btn color="primary" to="/new-post">NewPost</v-btn>

        <!-- <div class="loader-section" v-if="loading">
          <div class="user-list">
            <div class="columns">
              <div class="column is-8">
                <p class="user-list__header animated-background__header"></p>
                <p class="user-list__sub animated-background__sub"></p>
                <p class="user-list__sub animated-background__sub"></p>
              </div>
              <div class="column is-4 right">
                <router-link class="button is-primary" to="/user">View Post</router-link>
              </div>
            </div>
          </div>

          <div class="user-list">
            <div class="columns">
              <div class="column is-8">
                <p class="user-list__header animated-background__header"></p>
                <p class="user-list__sub animated-background__sub"></p>
                <p class="user-list__sub animated-background__sub"></p>
              </div>
              <div class="column is-4 right">
                <router-link class="button is-primary" to="/user">View Post</router-link>
              </div>
            </div>
          </div>

          <div class="user-list">
            <div class="columns">
              <div class="column is-8">
                <p class="user-list__header animated-background__header"></p>
                <p class="user-list__sub animated-background__sub"></p>
                <p class="user-list__sub animated-background__sub"></p>
              </div>
              <div class="column is-4 right">
                <router-link class="button is-primary" to="/user">View Post</router-link>
              </div>
            </div>
          </div>

          <div class="user-list">
            <div class="columns">
              <div class="column is-8">
                <p class="user-list__header animated-background__header"></p>
                <p class="user-list__sub animated-background__sub"></p>
                <p class="user-list__sub animated-background__sub"></p>
              </div>
              <div class="column is-4 right">
                <router-link class="button is-primary" to="/user">View Post</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="user-list" v-for="person in contacts" :key="person.id">
          <div class="columns">
            <div class="column is-8">
              <p class="user-list__header">{{person.firstname}} {{person.lastname}}</p>
              <div class="inner">
                <div class="left">
                  <p class="user-list__sub"><strong>Email</strong>: {{person.emailaddress}}</p>
                </div>
                <div class="right">
                  <p class="user-list__sub"><strong>Phone Number</strong>: {{person.phonenumber}}</p>
                </div>
              </div>
            </div>
            <div class="column is-4 right">
              <router-link class="button is-primary" :to="{ name: 'detail-post', params: { person: person.slug }}">View Post</router-link>
            </div>
          </div>
        </div> -->
      </v-layout>
    </v-container>

</template>

<script>
import db from './firebaseInit'

export default {
  name: 'home',
  data () {
    return {
      contacts: [],
      loading: true
    }
  },
  created () {
    db.collection('contacts').get().then((querySnapshot) => {
      this.loading = false
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'firstname': doc.data().firstname,
          'lastname': doc.data().lastname,
          'emailaddress': doc.data().emailaddress,
          'phonenumber': doc.data().phonenumber,
          'slug': doc.data().slug
        }
        this.contacts.push(data)
      })
    })
  }
}
</script>

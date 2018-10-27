<template>
  <section class="container">
    <h1>New Post</h1>
    <form @submit.prevent="saveContact">
      <div id="imageTarget">
        <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="First Name" v-model="firstname" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Last Name" v-model="lastname" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Email Address</label>
        <div class="control">
          <input class="input" type="email" placeholder="Email Address" v-model="emailaddress" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Phone Number</label>
        <div class="control">
          <input class="input" type="text" placeholder="Phone Number" v-model="phonenumber" required>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button type="submit" class="button is-link">Submit</button>
        </div>
      </div>
      </div>
    </form>
    <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Hello%20world" target="_blank" data-size="large">Tweet</a>
    <button class="button is-primary" v-on:click="generateImage">image</button>
    <h3>↓↓ここから画像化↓↓（上の対象のDIVを画像化）</h3>
      <img src="" id="result" />
    <h3>↑↑ここまで画像↑↑</h3>
  </section>
</template>

<script>
import db from './firebaseInit'
import html2canvas from 'html2canvas'

export default {
  name: 'new-post',
  data () {
    return {
      firstname: null,
      lastname: null,
      emailaddress: null,
      phonenumber: null
    }
  },
  methods: {
    saveContact () {
      db.collection('contacts').add({
        firstname: this.firstname,
        lastname: this.lastname,
        emailaddress: this.emailaddress,
        phonenumber: this.phonenumber,
        slug: this.generateUUID()
      }).then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      }).catch(function (error) {
        console.error('Error adding document: ', error)
      })
    },
    generateUUID () {
      let d = new Date().getTime()
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    },
    generateImage () {
      // https://html2canvas.hertzen.com/getting-started
      html2canvas(document.getElementById('imageTarget')).then(canvas => {
        var imgData = canvas.toDataURL()
        document.getElementById('result').src = imgData
      })
    }
  }
}
</script>

<style scoped>
section {
  height: 100vh;
}
h1 {
  font-size: 30px;
  margin: 30px 0;
}
.input {
  height: 40px;
}
</style>

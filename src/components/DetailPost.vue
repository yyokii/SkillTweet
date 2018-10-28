<template>
  <section class="container">

    <h1>Detail Post</h1>

    <div class="contact--section">
      <p class="__name">{{firstname}} {{lastname}}</p>

      <p>{{emailaddress}}</p>

      <p>{{phonenumber}}</p>

    </div>
  </section>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'detail-post',
  data () {
    return {
      firstname: null,
      lastname: null,
      emailaddress: null,
      phonenumber: null
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('contacts').where('slug', '==', to.params.person).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        next(vm => {
          vm.firstname = doc.data().firstname
          vm.lastname = doc.data().lastname
          vm.emailaddress = doc.data().emailaddress
          vm.phonenumber = doc.data().phonenumber
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('contacts').where('slug', '==', this.$route.params.person).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
          this.firstname = doc.data().firstname
          this.lastname = doc.data().lastname
          this.emailaddress = doc.data().emailaddress
          this.phonenumber = doc.data().phonenumber
        })
      })
    }
  }
}
</script>

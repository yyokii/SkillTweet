<template>
  <v-container fluid>
    <v-layout wrap>
        <!-- <div>
          <radarChart :data="radarChartData" :option="radarChartOptions"></radarChart>
        </div> -->

        <!-- （入力）名前 -->
        <v-flex class="xs12 mt-5">
          <h2>
            <v-icon class="accent--text">person</v-icon>
            名前を入れよう！
          </h2>
        </v-flex>

        <v-flex class="xs6 offset-xs3 mt-3">
          <v-text-field
          class="xs5"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          label="ニックネーム🤗"
          ></v-text-field>
        </v-flex>

        <!-- （入力）スキルセット -->
        <v-flex class="xs12 mt-5">
          <h2>
            <v-icon class="accent--text">add_box</v-icon>
            スキルを設定しよう！
          </h2>
        </v-flex>

        <v-flex class="xs8 offset-xs2 mt-3">
          <v-combobox
            class="mt-3"
            v-model="chips"
            :items="items"
            label="Your favorite hobbies"
            chips
            clearable
            solo
            multiple
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                :selected="data.selected"
                close
                @input="remove(data.item)"
              >
                <strong>{{ data.item }}</strong>&nbsp;
              </v-chip>
            </template>
          </v-combobox>
        </v-flex>

          <!-- 画像化対象 -->
        <v-flex class="xs8 offset-xs2 mt-3"
          v-if="name.length > 0 && name.length <= 10"
        >
          <v-card class="mt-5" id="imageTarget">
              <h4 class="text-xs-center pt-2">{{ name }} のスキル</h4>
              <div class="text-xs-center mt-2 pb-2">
                <v-chip
                  color="primary"
                  text-color="white"
                  v-for="chip in chips"
                  :key="chip.id"
                >
                  {{ chip }}
                </v-chip>
              </div>
          </v-card>
        </v-flex>

        <!-- TODO: disable（画像重複とか避けたい） -->
        <v-flex class="xs6 offset-xs3 mt-3">
          <v-btn
            color="primary"
            class="white--text mt-5"
            @click="generateImage()"
          >
            Tweetする
            <v-icon right dark>edit</v-icon>
          </v-btn>
        </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import db from '../firebaseInit'
import html2canvas from 'html2canvas'

export default {
  name: 'new-post',
  data () {
    return {
      chips: [],
      items: ['Swift', 'JavaScript'],
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      showTweetImg: false
    }
  },
  mounted () {
    // https://sourceacademy.work/#/vuejs/vueSetPageTitle#VuejsSetPageTitle2
    document.querySelector("meta[property='og:title']").setAttribute('content', 'こっちだよ')
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
      this.showTweetImg = true
      // https://html2canvas.hertzen.com/getting-started
      html2canvas(document.getElementById('imageTarget')).then(canvas => {
        var imgData = canvas.toDataURL()
        // document.getElementById('genaratedImage').src = imgData
        document.querySelector("meta[property='og:image']").setAttribute('content', imgData)
        window.open('https://twitter.com/intent/tweet?text=http://localhost:8080/new-post')
      })
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    }
  }
}
</script>
<style lang="scss" scoped>
// https://1design.jp/web-development/css/1844
  img {
    width:auto;
    height:auto;
    max-width:100%;
    max-height:100%;
  }
</style>

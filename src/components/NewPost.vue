<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex  align-center xs8 offset-xs2 mt-3>
        <!-- <div>
          <radarChart :data="radarChartData" :option="radarChartOptions"></radarChart>
        </div> -->

        <!-- （入力）名前 -->
        <v-text-field
          class="mt-5"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          label="名前を入れてね🙂"
        ></v-text-field>

        <!-- （入力）スキルセット -->
        <v-combobox
          class="mt-5"
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

        <!-- TODO: disable（画像重複とか避けたい） -->
        <v-btn
          color="primary"
          class="white--text"
          @click="generateImage()"

        >
          作成する
          <v-icon right dark>edit</v-icon>
        </v-btn>

        <!-- 画像化対象 -->
        <v-card class="mt-5" id="imageTarget">
            <h2 class="text-xs-center" v-if="name.length > 0 && name.length <= 10">{{ name }} のできること</h2>
            <div class="text-xs-center mt-4">
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

        <!-- 画像化したものを表示する -->
        <!-- https://qiita.com/youwht/items/8b681a856f59aa82d671 -->
        <v-card class="mt-5">
            <h2 class="text-xs-center"> Tweet イメージ👇</h2>
            <div class="mt-4">
                <img src="" id="genaratedImage" width="600" height="314"/>
            </div>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from './firebaseInit'
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
      ]
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
        document.getElementById('genaratedImage').src = imgData
      })
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    }
  }
}
</script>

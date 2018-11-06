<template>
  <v-container fluid>
    <v-layout wrap>

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
            v-model="skills"
            :items="items"
            label="スキルを入力しよう"
            chips
            clearable
            solo
            multiple
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                color="indigo lighten-4"
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
        <v-flex class="xs8 offset-xs2 mt-3" v-if="validateTweetContent">
          <h2 class="mt-3">
            <v-icon class="accent--text">thumb_up_alt</v-icon>
            共有しよう！
          </h2>
          <v-card class="mt-4" id="imageTarget">
              <h4 class="text-xs-center pt-2">{{ name }} のスキル</h4>
              <div class="text-xs-center mt-2 pb-2">
                <v-chip
                  :color="`${getColor()} lighten-3`"
                  text-color="black"
                  v-for="skill in skills"
                  :key="skill.id"
                >
                  {{ skill }}
                </v-chip>
              </div>
          </v-card>
        </v-flex>

        <v-flex class="xs6 offset-xs3 mt-4 mb-5" v-if="validateTweetContent">
          <v-btn
            color="#00aced"
            class="font-weight-bold white--text mt-5"
            @click="post()"
            :disabled="isPushed"
          >
            ツイートする
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
      skills: [],
      items: [],
      colors: ['red', 'green', 'light-green', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'orange', 'pink',
        'amber', 'lime', 'deep-orange', 'brown', 'blue-grey'],
      name: '',
      nameRules: [
        v => !!v || '名前は必須です⚠️',
        v => (v && v.length <= 10) || '10文字以内⚠️'
      ],
      // http://www.sky-limit-future.com/entry/vue_disabled_btn
      isPushed: false
    }
  },
  computed: {
    validateTweetContent () {
      if ((this.name.length > 0 && this.name.length <= 10) && this.skills.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getColor () {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    post () {
      this.isPushed = true
      this.generateImage()
      this.savePost(
        _ => {
          window.open('https://twitter.com/intent/tweet?text=http://localhost:8080/new-post')
          document.querySelector("meta[property='og:image']").setAttribute('content', '')
          this.isPushed = false
        },
        _ => {
          this.isPushed = false
        })
    },
    // firestoreに投稿情報を設定
    savePost (success, fail) {
      db.collection('posts').add({
        name: this.name,
        skills: this.skills,
        timeStamp: Date.now()
      }).then(docRef => {
        console.log('Document written with ID: ', docRef.id)
        success()
      }).catch(error => {
        console.error('Error adding document: ', error)
        fail()
      })
    },
    // tweet画像生成
    generateImage () {
      // https://html2canvas.hertzen.com/getting-started
      html2canvas(document.getElementById('imageTarget')).then(canvas => {
        var imgData = canvas.toDataURL()

        // TODO: ここ切り出すかなんかしたい
        // https://sourceacademy.work/#/vuejs/vueSetPageTitle#VuejsSetPageTitle2
        document.querySelector("meta[property='og:image']").setAttribute('content', imgData)
      })
    },
    remove (item) {
      this.skills.splice(this.skills.indexOf(item), 1)
      this.skills = [...this.skills]
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

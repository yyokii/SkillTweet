<template>
  <v-container fluid>
    <v-layout wrap>
        <v-snackbar
          v-model="errorSnackbar"
          :top="true"
          color="error"
          :timeout=3000
        >
          エラーが発生しました😓
          <v-btn
            dark
            flat
            @click="errorSnackbar = false"
          >
            閉じる
          </v-btn>
        </v-snackbar>

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
            :loading="isPushed"
          >
            ツイートする
            <v-icon right dark>edit</v-icon>
          </v-btn>
        </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import firebase from '../firebaseInit'
import html2canvas from 'html2canvas'

export default {
  name: 'new-post',
  data () {
    return {
      errorSnackbar: false,
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
    // FIXME: 色の反映タイミングが多すぎるので修正したい
    getColor () {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    applyErrorUI () {
      this.errorSnackbar = true
      this.isPushed = false
    },
    post () {
      this.isPushed = true
      // firestoreへデータ保存処理
      const savePostToFirebase = firebase.firestore().collection('posts').add({
        name: this.name,
        skills: this.skills,
        timeStamp: Date.now()
      })
      // 画像化処理
      // https://html2canvas.hertzen.com/getting-started
      const generateImage = html2canvas(document.getElementById('imageTarget'))

      // 非同期処理実行
      // https://lab.syncer.jp/Web/JavaScript/Reference/Global_Object/Promise/all/
      Promise.all([savePostToFirebase, generateImage])
        .then(result => {
          console.log('FireBaseへの投稿データ保存、画像化処理完了')
          result[1].toBlob((blob) => {
            this.uploadImageToFirebaseStorage(result[0].id, blob)
          })
        })
        .catch(error => {
          console.log(error)
          this.applyErrorUI()
        })
    },
    uploadImageToFirebaseStorage (postDataRefId, blob) {
      // https://firebase.google.com/docs/storage/web/upload-files?hl=ja
      const storageRef = firebase.storage().ref().child('skillImages')
      const uploadTask = storageRef.child(postDataRefId + '.jpg').put(blob)
      uploadTask.on('state_changed', (snapshot) => {
        switch (snapshot.state) {
          case 'paised':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      }, (error) => {
        console.log(error)
        this.applyErrorUI()
      }, _ => {
        this.isPushed = false
        // https://qiita.com/ampersand/items/2ec01bd5c5b64f1e67bf
        window.open(`https://twitter.com/share?url=https://skilltweetapp.firebaseapp.com/top/${postDataRefId}&text=私のスキルです👍%20created%20by%20%23SkillApp`)
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

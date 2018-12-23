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
        <v-flex xs12 mt-5>
          <h2>
            <v-icon class="accent--text">person</v-icon>
            ① 名前を入れよう！
          </h2>
        </v-flex>

        <v-flex xs6 offset-xs3 mt-5>
          <v-text-field
          class="xs5"
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="ニックネーム😉"
          solo
          ></v-text-field>
        </v-flex>

        <!-- （入力）スキルセット -->
        <v-flex xs12 mt-5>
          <h2>
            <v-icon class="accent--text">add_box</v-icon>
            ② スキルを設定しよう！
          </h2>
        </v-flex>

        <v-flex xs10 offset-xs1 sm6 offset-sm3 mt-5>
          <v-layout row>
            <v-text-field
              v-model="skill"
              :counter="10"
              :rules="skillRules"
              label="スキル入力"
              placeholder="スキルを入力してね"
              solo
            ></v-text-field>
            <v-btn
              flat
              icon
              class="accent--text"
              :disabled="disableAddSkill"
              :large=true
              @click="addSkill()"
            >
              <v-icon>add_box</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <!-- （入力確認、削除機能）スキルセット -->
        <!-- <v-flex xs8 offset-xs2 mt-3>
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
                close
                @input="remove(data.item)"
              >
                <strong>{{ data.item }}</strong>&nbsp;
              </v-chip>
            </template>
          </v-combobox>
        </v-flex> -->

        <v-flex xs10 sm6 md4 offset-xs1 offset-sm3 offset-md4 mt-5
          v-if="validateTweetContent">
          <h2 mt-3>
            <v-icon class="accent--text">thumb_up_alt</v-icon>
            ③ 共有しよう！
          </h2>

          <!-- リセットボタン -->
          <v-layout justify-end mt-5>
            <v-btn
              :align-end=true
              flat
              icon
              @click="reset()"
            >
              <v-icon>fas fa-trash-alt</v-icon>
            </v-btn>
          </v-layout>

          <!-- 画像化対象 -->
          <v-card class="tweetContentBack mt-2 pt-2 pb-2 pl-2 pr-2" id="imageTarget">
            <v-responsive class="whiteBack" :aspect-ratio="2/1">
              <div class="mt-3">
                <h4 class="text-xs-center">{{ name }} のスキル</h4>
                <div class="text-xs-center mt-2">
                  <v-chip
                    :color="`${getColor()} lighten-3`"
                    text-color="black"
                    v-for="skill in skills"
                    :key="skill.id"
                  >
                    {{ skill }}
                  </v-chip>
                </div>
              </div>
            </v-responsive>
          </v-card>
        </v-flex>

        <!-- Tweet確認ダイアログ -->
        <v-dialog v-model="confirmDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Tweetしよう😄</v-card-title>
              <v-card-text>
                Nice!!
                <br>
                画像の作成に成功しました！
                <br>
                Tweetボタンからツイートができます😆
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="confirmDialog = false">キャンセル</v-btn>
              <v-btn color="green darken-1" flat @click="tweet()">
                Tweetする
                <v-icon right dark>fab fa-twitter</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-flex xs6 offset-xs3 mt-4 mb-5 v-if="validateTweetContent">
          <v-btn
            color="#00aced"
            class="font-weight-bold white--text mt-5"
            @click="createCard()"
            :disabled="isPushed"
            :loading="isPushed"
          >
            作成する
          </v-btn>
        </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import firebase from '../firebaseInit'
import html2canvas from 'html2canvas'
import jimp from 'jimp'

export default {
  name: 'new-post',
  data () {
    return {
      errorSnackbar: false,
      skill: '',
      skills: [],
      items: [],
      colors: ['red', 'green', 'light-green', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'orange', 'pink',
        'amber', 'lime', 'deep-orange', 'brown', 'blue-grey'],
      name: '',
      nameRules: [
        v => !!v || '名前は必須です⚠️',
        v => (v && v.length <= 10) || '10文字以内⚠️'
      ],
      skillRules: [
        v => (v.length <= 10) || '10文字以内⚠️'
      ],
      postDataRefId: '',
      confirmDialog: false,
      // http://www.sky-limit-future.com/entry/vue_disabled_btn
      isPushed: false
    }
  },
  computed: {
    disableAddSkill () {
      return !(this.skill.length > 0 && this.skill.length <= 10)
    },
    validateTweetContent () {
      return ((this.name.length > 0 && this.name.length <= 10) && this.skills.length !== 0)
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
    addSkill () {
      this.skills.push(this.skill)
      this.skill = ''
    },
    createCard () {
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
          // 画像化、fireStoreへのデータ保存終了後にStorage保存

          console.log('FireBaseへの投稿データ保存、画像化処理完了')
          const imageDataUrl = result[1].toDataURL()
          // https://github.com/oliver-moran/jimp/issues/231
          if (imageDataUrl.indexOf('base64') !== -1) {
            // 画像リサイズ処理
            jimp.read(Buffer.from(imageDataUrl.replace(/^data:image\/png;base64,/, ''), 'base64')).then((image, error) => {
              if (error) {
                console.log(error)
                return
              }
              // これいらないかも
              image
                .contain(1024, 512)
                .getBase64(jimp.MIME_PNG, (error, src) => {
                  if (error) {
                    console.log(error)
                    return
                  }
                  // blobに変換してfirestorageにアップロード
                  const replacedSrc = src.replace(/^data:image\/png;base64,/, '')
                  const blob = this.base64ToBlob(replacedSrc)
                  this.postDataRefId = result[0].id
                  this.uploadImageToFirebaseStorage(this.postDataRefId, blob)
                })
            })
          }
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
        this.confirmDialog = true
      })
    },
    tweet (postDataRefId) {
      this.confirmDialog = false
      // https://qiita.com/ampersand/items/2ec01bd5c5b64f1e67bf
      window.open(`https://twitter.com/share?url=https://skilltweetapp.firebaseapp.com/top/${this.postDataRefId}&text=私のスキルです👍%20created%20by%20%23SkillApp`)
    },
    imageResize (imageDataUrl) {
      // https://github.com/oliver-moran/jimp/issues/231
      if (imageDataUrl.indexOf('base64') !== -1) {
        jimp.read(Buffer.from(imageDataUrl.replace(/^data:image\/png;base64,/, ''), 'base64')).then((image, error) => {
          if (error) {
            console.log(error)
            return error
          }
          image
            .contain(1200, 600)
            .getBase64(jimp.MIME_PNG, (error, src) => {
              if (error) {
                console.log(error)
                return error
              }
              // blobに変換してfirestorageにアップロード
              return src
            })
        })
      }
    },
    base64ToBlob (base64) {
      var binary = atob(base64)
      var buffer = new Uint8Array(binary.length)
      for (var i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i)
      }
      return new Blob([buffer.buffer], {
        type: 'image/jpeg'
      })
    },
    reset () {
      this.skills = []
    },
    remove (item) {
      // comboboxで使用している、個別削除メソッド
      this.skills.splice(this.skills.indexOf(item), 1)
      this.skills = [...this.skills]
    }
  }
}
</script>

<style lang="scss" scoped>
  .tweetContentBack {
    background-image: url("../assets/tweetBack.png");
    background-size: cover;
  }
  .whiteBack {
    background-color: #ffffff;
  }
</style>

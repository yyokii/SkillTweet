<template>
  <v-container fluid>
    <v-layout wrap>
    <v-content>
      <section>
        <!-- https://github.com/vuetifyjs/vuetify/issues/1239 -->
        <v-parallax v-bind:src="require('../assets/hero.jpg')" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/logo.png" alt="Skill App" height="300">
            <h1 class="font-weight-black black--text mb-2 display-2 text-xs-center">自分のスキルをTwitterでアピール！</h1>
            <v-btn
              class="font-weight-bold mt-5"
              color="primary"
              large
              to="/new-post"
            >
              はじめる
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">自分のスキルを簡単にTweet</h2>
              <span class="subheading">
                画像付きTweetでみんなの注目の的
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">ログイン不要</div>
                    </v-card-title>
                    <v-card-text>
                      ログインや、Twitter連携などは必要ありません😄
                      <br>
                      面倒な手間は一切ありません。
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">つくる</div>
                    </v-card-title>
                    <v-card-text>
                      ニックネームとスキルを入力しよう！
                      <br>
                      必要なのはそれだけです。
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">共有</div>
                    </v-card-title>
                    <v-card-text>
                      転職の時の簡単なスキル一覧として使ったり、
                      自分の出来ることを知ってもらうために使おう。
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax v-bind:src="require('../assets/section.jpg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline font-weight-bold white--text mb-3 text-xs-center">あなたのスキルはきっと誰かを幸せにする</div>
            <em>知ってもらうことから始めよう</em>
            <v-btn
              class="font-weight-bold mt-5"
              color="primary"
              large
              to="/new-post"
            >
              スキルをアピールする
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">つくった人</div>
                </v-card-title>
                <v-card-text>
                  渋谷のIT企業のアプリエンジニア:)
                  <br>
                  25才. 肉と猫とAppleが好きです✌︎
                  <br>
                  <br>
                  iOS：swift, objective-c
                  <br>
                  Android: java, kotlin
                  <br>
                  Web: vuejs, php.
                  <br>
                  <br>
                  swift が好き. アプリ開発こそ至高。
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">お問い合わせ</div>
                </v-card-title>
                <v-card-text>
                  いつでも、なんでも
                  <br>
                  ご連絡くださいませ。
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">fab fa-twitter</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-center">
                        <a class="center" href="https://twitter.com/enyyokii" target="_blank">@enyyokii</a>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-center">yyokii.h@gmail.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-center"> 東京, 埼玉</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

    </v-content>
    </v-layout>
    </v-container>
</template>

<script>
import firebase from '../firebaseInit'

export default {
  name: 'top',
  created () {
    // this.setAttribute()
  },
  methods: {
    setAttribute () {
      // https://teratail.com/questions/69562
      const url = location.href
      let splitedUrl = url.split('/').filter(e => Boolean(e))
      if (splitedUrl[splitedUrl.length - 2] !== 'top') {
        document.querySelector("meta[property='og:image']").setAttribute('content', 'src/assets/logo.jpg')
        return
      }
      // /top/hoge 形式のurlの場合
      const postDataRefId = splitedUrl[splitedUrl.length - 1]
      const imagesRef = firebase.storage().ref().child('skillImages')
      const imageRef = imagesRef.child(postDataRefId + '.jpg')

      // Get the download URL
      imageRef.getDownloadURL().then(url => {
        // Insert url into an <img> tag to "download"
        console.log('画像ダウンロードurl')
        console.log(url)
        document.querySelector("meta[property='og:url']").setAttribute('content', `https://skilltweetapp.firebaseapp.com/top/${postDataRefId}`)
        document.querySelector("meta[property='og:image']").setAttribute('content', url)
      }).catch(error => {
        console.log(error)
        console.log('ロゴを設定')
        document.querySelector("meta[property='og:image']").setAttribute('content', 'src/assets/logo.jpg')
      })

      // https://sourceacademy.work/#/vuejs/vueSetPageTitle#VuejsSetPageTitle2
      // document.querySelector("meta[property='og:image']").setAttribute('content', 'imgData')
    }
  }
}
</script>

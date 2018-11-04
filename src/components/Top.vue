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
              class="mt-5"
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
              class="mt-5"
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
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-center">777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-center"> Chicago, US</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-center">john@vuetifyjs.com</v-list-tile-title>
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
import db from '../firebaseInit'

export default {
  name: 'top',
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

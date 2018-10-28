<template>
  <v-dialog v-model="show" persistent max-width="500px">
    <v-card>
      <v-card-text>
        <v-layout wrap>
            <v-flex xs12>
              <v-flex md-5>
                <v-text-field
                  label="Skill"
                  hint="input skill name"
                ></v-text-field>
              </v-flex>
              <h2 class="text-xs-left mt-3 mb-5">Level</h2>
              <v-slider
                always-dirty
                hint="select skill level"
                persistent-hint
                thumb-label="always"
              ></v-slider>
            </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.stop="show=false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.stop="show=false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  data () {
    return {}
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

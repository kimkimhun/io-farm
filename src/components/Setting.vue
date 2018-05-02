<template>
   <v-layout column>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
       <v-card dark color="green light-2">
          <v-card-text class="px-0">
            <h3 class="display-3">{{parseFloat(tempmax).toFixed(2)}} C</h3>
            <h3 class="display-2">Temperature</h3>
            <v-slider color="black" min="35" max="39" v-model="tempmax" step="0"></v-slider>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-layout row class="text-xs-center mt-5">
    <v-flex xs12>
              <v-tooltip bottom>
                 <v-btn slot="activator" dark large fab color="green" @click="updateSetting()"><v-icon x-large>save</v-icon></v-btn>
      <span>Save</span>
    </v-tooltip>
            <v-tooltip bottom>
        <v-btn slot="activator" dark large fab color="red" to="/"><v-icon x-large>cancel</v-icon></v-btn>
   <span>Cancel</span>
    </v-tooltip>

       </v-flex>
  </v-layout>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      tempmax: 35
    }
  },
  created () {
    firebase.database().ref('setting').once('value').then(snapshot => {
      this.tempmax = snapshot.val().tempmax
    })
  },
  methods: {
    updateSetting () {
      const update = {
        tempmax: parseFloat(this.tempmax).toFixed(2),
        tempmin: parseFloat(this.tempmax-1).toFixed(2)
      }
      const updates = {}
      firebase.database().ref('setting').update(update).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>

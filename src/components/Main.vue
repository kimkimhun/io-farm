<template>
 <v-container>
  <v-layout row wrap class="text-xs-center">
    <v-flex xs12 sm6 mt-5>
       <v-card dark color="blue light-2">
          <v-card-text class="px-0">
            <h3 class="display-3">{{temperature}} C</h3>
            <h3 class="display-2">Temperature</h3>
            <v-icon class="mt-3" x-large>fas fa-thermometer-empty</v-icon>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex xs12 sm6 mt-5 >
        <v-card dark color="indigo light-2">
          <v-card-text class="px-0">
            <h3 class="display-3">{{humduty}} %</h3>
            <h3 class="display-2">Humduty</h3>
            <v-icon class="mt-3" x-large>fas fa-tint</v-icon>
          </v-card-text>
        </v-card>
    </v-flex>
  </v-layout>
  <v-layout row class="text-xs-center mt-5">
    <v-flex xs12>
        <v-tooltip bottom>
       <v-btn slot="activator" outline large fab color="green" to="/setting"><v-icon x-large>settings</v-icon></v-btn>
      <span>Setting</span>
    </v-tooltip>

    </v-flex>
  </v-layout>
 </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      temperature: 0,
      humduty: 0
    }
  },
  created() {
    let displayRef = firebase.database().ref('display');
    displayRef.on('value', (snapshot) => {
      this.temperature = snapshot.val().temperature;
      this.humduty = snapshot.val().humduty;
    });

  }
}
</script>

<style>
.temp-box{
  background: red;
}
</style>

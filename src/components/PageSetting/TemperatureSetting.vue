<template>
   <v-layout column>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
       <v-card dark color="green light-2">
          <v-card-text class="px-0">
            <h3 class="display-3">{{parseFloat(tempmax).toFixed(2)}} C</h3>
            <h3 class="display-2">{{$t('message.main-temperature')}}</h3>
              <v-layout row class="text-xs-center mt-5">
                <v-flex xs12>
                  <v-tooltip bottom>
                    <v-btn slot="activator" dark large fab color="blue lighten-2" @click="add()"><v-icon x-large>add</v-icon></v-btn>
                    <span>{{$t('message.tooltip-add')}}</span>
                </v-tooltip>
                    <v-tooltip bottom>
                    <v-btn slot="activator" dark large fab color="blue lighten-2" @click="remove()"><v-icon x-large>remove</v-icon></v-btn>
              <span>{{$t('message.tooltip-remove')}}</span>
                </v-tooltip>
                </v-flex>
              </v-layout>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-layout row class="text-xs-center mt-5">
    <v-flex xs12>
              <v-tooltip bottom>
                 <v-btn slot="activator" dark large fab color="green" @click="updateSetting()"><v-icon x-large>save</v-icon></v-btn>
      <span>{{$t('message.tooltip-save')}}</span>
    </v-tooltip>
            <v-tooltip bottom>
        <v-btn slot="activator" dark large fab color="red" to="/setting"><v-icon x-large>cancel</v-icon></v-btn>
   <span>{{$t('message.tooltip-cancel')}}</span>
    </v-tooltip>
    </v-flex>
  </v-layout>
  </v-layout>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tempmax: 35
    };
  },
  created() {
    firebase
      .database()
      .ref("setting")
      .once("value")
      .then(snapshot => {
        this.tempmax = snapshot.val().tempmax;
      });
  },
  methods: {
    add() {
      this.tempmax =
        parseFloat(parseFloat(this.tempmax).toFixed(2)) >= 39
          ? parseFloat(parseFloat(this.tempmax).toFixed(2))
          : parseFloat(parseFloat(this.tempmax + 0.25).toFixed(2));
    },
    remove() {
      this.tempmax =
        parseFloat(parseFloat(this.tempmax).toFixed(2)) <= 35
          ? parseFloat(parseFloat(this.tempmax).toFixed(2))
          : parseFloat(parseFloat(this.tempmax - 0.25).toFixed(2));
    },
    updateSetting() {
      const update = {
        tempmax: parseFloat(parseFloat(this.tempmax).toFixed(2)),
        tempmin: parseFloat(parseFloat(this.tempmax - 0.25).toFixed(2)),
        contact: {
          changeTemperature: true,
          changeRotate: false
        }
      };
      firebase
        .database()
        .ref("setting")
        .update(update)
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<style>

</style>

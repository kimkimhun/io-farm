<template>
   <v-layout column>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
       <v-card dark color="green light-2">
          <v-card-text class="px-0">
            <h3 class="display-3">{{parseFloat(tempmax).toFixed(2)}} C</h3>
            <h3 class="display-2">{{$t('message.main-temperature')}}</h3>
            <br/>
             <v-tooltip bottom>
                 <v-btn slot="activator" dark large fab color="black" to="/setting/temperature"><v-icon x-large>settings</v-icon></v-btn>
              <span>{{$t('message.tooltip-setting')}}</span>
              </v-tooltip>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
       <v-card dark color="indigo light-2">
          <v-card-text class="px-0">
            <h3 class="display-3">{{parseInt(rotate)}} {{$t('message.hour')}}</h3>
            <h3 class="display-2">{{$t('message.main-rotate')}}</h3>
             <br/>
             <v-tooltip bottom>
                 <v-btn slot="activator" dark large fab color="black" to="/setting/rotate"><v-icon x-large>settings</v-icon></v-btn>
              <span>{{$t('message.tooltip-setting')}}</span>
              </v-tooltip>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-3>
       <v-card flat>
          <v-card-text class="px-0">
             <v-tooltip bottom>
                 <v-btn slot="activator"  outline large fab color="green"  to="/"><v-icon x-large>arrow_back</v-icon></v-btn>
              <span>{{$t('message.tooltip-back')}}</span>
              </v-tooltip>
          </v-card-text>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tempmax: 35,
      rotate: 1
    };
  },
  created() {
    firebase
      .database()
      .ref("setting")
      .once("value")
      .then(snapshot => {
        this.tempmax = snapshot.val().tempmax;
        this.rotate = snapshot.val().rotate;
      });
  },
  methods: {
    updateSetting() {
      const update = {
        tempmax: parseFloat(parseFloat(this.tempmax).toFixed(2)),
        tempmin: parseFloat(parseFloat(this.tempmax - 1).toFixed(2)),
        rotate: parseInt(this.rotate),
        contact: {
          changeData: true
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

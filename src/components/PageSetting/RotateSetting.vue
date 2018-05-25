<template>
   <v-layout column>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
       <v-card dark color="indigo light-2">
          <v-card-text class="px-0">
            <h3 class="display-3">{{parseInt(rotate)}} {{$t('message.hour')}}</h3>
            <h3 class="display-2">{{$t('message.main-rotate')}}</h3>
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
      rotate: 1
    };
  },
  created() {
    firebase
      .database()
      .ref("setting")
      .once("value")
      .then(snapshot => {
        this.rotate = snapshot.val().rotate;
      });
  },
  methods: {
    add() {
      this.rotate =
        parseInt(parseInt(this.rotate)) >= 5
          ? parseInt(parseInt(this.rotate))
          : parseInt(parseInt(this.rotate + 1));
    },
    remove() {
      this.rotate =
        parseInt(this.rotate) <= 1
          ? parseInt(this.rotate)
          : parseInt(this.rotate - 1);
    },
    updateSetting() {
      const update = {
        rotate: parseInt(this.rotate),
        contact: {
          changeTemperature: false,
          changeRotate: true
        }
      };
      firebase
        .database()
        .ref("setting")
        .update(update)
        .then(() => {
          this.$router.replace("/");
        });
    }
  }
};
</script>

<style>

</style>

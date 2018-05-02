<template>
  <v-app>
    <v-toolbar flat color="green light-2" dark fixed app :clipped-left="clipped">
      <v-toolbar-title v-text="appName"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click="userSignOut" v-if="isAuthenticated">
        <v-icon left>exit_to_app</v-icon>
        Sign Out
      </v-btn>
      <v-btn
        flat
        v-for="(item, i) in toolbarItems"
        :key="item.i"
        :to="item.link">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app justify-center>
      <span>&copy; {{new Date().getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
      }
    }, computed: {
      appName() {
        return this.$store.getters.appTitle
      },
      isAuthenticated() {
        return (
          this.$store.getters.getUser !== null &&
          this.$store.getters.getUser !== undefined
        );
      },
      toolbarItems() {
        return this.isAuthenticated ? [] : [
          {
            icon: "face",
            title: "Sign Up",
            link: "/signup"
          }, {
            icon: "lock_open",
            title: "Sign In",
            link: "/signin"
          }
        ];
      }
    },
    methods: {
      userSignOut() {
        this.$store.dispatch("userSignOut");
      }
    }
  }
</script>

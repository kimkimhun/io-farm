<template>
  <v-app>
    <v-toolbar flat color="green light-2" dark fixed app :clipped-left="clipped">
      <v-toolbar-title v-text="appName"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click="userSignOut" v-if="isAuthenticated">
        <v-icon left>exit_to_app</v-icon>
        {{$t('message.signout')}}
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
      <v-spacer></v-spacer>
       <v-menu open-on-hover offset-y>
      <v-btn flat slot="activator">{{$t('message.language')}}</v-btn>
      <v-list>
        <v-list-tile v-for="(item, index) in itemslang" :key="`${index}${item.title}`" @click="menuLanguage (index)">
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-footer>
  </v-app>
</template>

<script>
const LANGUAGE = 'language'
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
        itemslang: [
          {title: 'ไทย', lang: 'th'},
          {title: 'English', lang: 'en'}
        ]
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
            title: this.$t('message.signup'),
            link: "/signup"
          }, {
            icon: "lock_open",
            title: this.$t('message.signin'),
            link: "/signin"
          }
        ];
      }
    },
    methods: {
      userSignOut() {
        this.$store.dispatch("userSignOut");
      },
      menuLanguage (index) {
        this.$i18n.locale = this.itemslang[index].lang
        localStorage.setItem(LANGUAGE, this.itemslang[index].lang)
      }
    }
  }
</script>

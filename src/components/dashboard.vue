<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="http">
          <v-list-tile-action>
            <v-icon>http</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>HTTP Endpoints</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="callout">
          <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Callout Group</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="chef">
          <v-list-tile-action>
            <v-icon>copyright</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Chef</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="remote">
          <v-list-tile-action>
            <v-icon>settings_remote</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Remote Commands</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="jira">
          <v-list-tile-action>
            <v-icon>bug_report</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>JIRA</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  },
  methods: {
    http() {
      this.$router.push({path: '/dashboard/http'})
    },
    callout(){
      this.$router.push({path: '/dashboard/firstcall'})
    },
    chef(){

    },
    remote(){

    },
    jira(){

    }
  },
}
</script>

<style scoped>

</style>

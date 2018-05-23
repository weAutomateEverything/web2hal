<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Waiting for Telegram</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              We are waiting for the lkogin request to be approved on the telegram group...<br/>
              {{ message }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'waitForLogin',
  data() {
    return {
      message: '',
      t: null,
    }
  },
  methods: {
    checkData() {
      this.$http.get('/api/telegram/auth/' + this.$route.params.id).then(response => {
        this.message = 'approved'
        clearInterval(this.t)
        window.localStorage.setItem('token', response.headers.get('Authorization'))
        this.$router.push({path: '/dashboard'})
      }, response => {
        this.message = response.body
      })
    },
    poll() {
      this.t = setInterval(this.checkData, 10000);
    }
  },
  mounted() {
    this.poll()
  },
  destroyed() {
    clearInterval(this.t)
  }
}
</script>

<style scoped>

</style>

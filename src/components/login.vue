<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">

            <v-card-text>

              <v-form>
                <v-text-field v-model="chat" prepend-icon="chat" name="chat" label="chat group id"
                              type="number"></v-text-field>
                <v-text-field v-model="name" prepend-icon="person" name="name" label="your name" id="name"
                              type="name"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        chat: 0,
        name: '',
        error: ''
      }
    },
    methods: {
      submit() {
        this.$http.post('/api/telegram/auth', {RoomId: parseInt(this.chat), Name: this.name}).then(response => {
          return response.json()
        }, response => {
          this.error = response.body
        }).then(json => {
          this.$router.push({path: '/login/' + json.Key})
        })
      }
    }
  }
</script>

<style scoped>

</style>

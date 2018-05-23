<template>
  <v-layout>

    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add a new HTTP endpoint to monitor</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-alert v-if="error != ''" type="error">
            {{ error }}
          </v-alert>
          <v-form>
            <v-text-field label="name" v-model="name" required
                          hint="a friendly name that describes that this http service does. For example 'we automate everything home page'"></v-text-field>
            <v-text-field label="URL" v-model="URL" required
                          hint="The full HTTP path to the service, for example https://www.weautomateeverything.io"></v-text-field>
            <v-select label="method" v-model="method" :items="methods" required
                      hint="GET - No data is sent with the request. POST-FORM you can specify multiple form parameters. POST you can specify 1 parameter, normally a json string"></v-select>
            <v-text-field label="failure threshold" v-model="threshold"
                          hint="how many times in a row must the test fail before the system starts alerting?" required
                          type="numeric"></v-text-field>
            <v-card>
              <v-card-title>
                Parameters
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex sm4>
                    <v-text-field label="Name"></v-text-field>
                  </v-flex>
                  <v-flex sm4 offset-sm1>
                    <v-text-field label="Value"></v-text-field>
                  </v-flex>
                  <v-flex sm1>
                    <v-btn>Remove</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex sm1>
                    <v-btn>Add Row
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'addhttpsmoke',
    data() {
      return {
        methods: [
          {text: 'GET'},
          {text: 'POST-FORM'},
          {text: 'POST'}
        ],
        name: '',
        method: '',
        URL: '',
        threshold: '',
        error: ''
      }
    },
    methods: {
      submit() {
        this.$http.post('/api/httpEndpoints', {
          Name: this.name,
          Method: this.method,
          URL: this.URL,
          Threshold: parseInt(this.threshold)
        }).then(response => {
          this.$router.push({path: '/dashboard/http'})
        }, response => {
          let j = response.json()
          this.error = j.error
        })
      }
    }
  }
</script>

<style scoped>

</style>

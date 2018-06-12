<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Default Callout</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-alert :value="error" type="error">
            {{ error }}
          </v-alert>
          <v-alert :value="success" type="success">
            {{ success }}
          </v-alert>
          <v-form>
            <v-text-field label="Phone Number" v-model="phone"
                          hint="Default Phone Number"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submit">Submit</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
      name: "defaultCallout",
      data() {
        return {
          phone: '',
          error: '',
          success: '',
        }
      },
      mounted() {
        this.getCurrentNumber()
      },
      methods: {
        submit() {
          this.$http.post("/api/firstcall/defaultCallout",{PhoneNumber: this.phone}).then(response => {
            this.success = "Default number has been successfully set."
            this.error = ''
          }, response => {
            this.success = ''
            return response.json()
          }).then(json => {
            if (json){
              this.error = json.error
            }
          })
        },
        getCurrentNumber() {
          this.$http.get("/api/firstcall/defaultCallout").then(response => {
            return response.json()
          },response => {
            return response.json()
          }).then(json => {
            this.phone = json.PhoneNumber
            this.error = json.error
          })
        }
      },
    }

</script>

<style scoped>

</style>

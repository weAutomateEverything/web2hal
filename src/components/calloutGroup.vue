<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Callout Group</v-toolbar-title>
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
            <v-text-field label="Group Name" v-model="group" required
                          hint="Your teams name on the callout portal"></v-text-field>
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
    name: 'calloutGroup',
    data() {
      return {
        group: '',
        error: '',
        success: ''
      }
    },
    mounted() {
      this.$http.get('/api/bankcallout/firstcall').then(response => {
        return response.json()
      }, response => {
        return response.json()
      }).then(json => {
        this.group = json.Group
        this.error = json.error
      })
    },
    methods: {
      submit() {
        this.$http.post('/api/bankcallout/firstcall',{Group: this.group}).then(response => {
          return response.json()
        }, response => {
          return response.json()
        }).then (json => {
          if (json.error) {
            this.error = json.error
            this.success = ''
          } else {
            this.error = ''
            this.success = 'Callout Group has been successfully updated. On first call is '+json.Name+' '+json.PhoneNumber
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>

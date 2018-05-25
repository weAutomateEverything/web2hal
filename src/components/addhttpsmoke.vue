<template>
  <v-layout>

    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add a new HTTP endpoint to monitor</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-alert value="error" type="error">
            {{ this.error }}
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
                <v-data-table :items="parameters" :headers="paramHeader">
                  <template slot="items" slot-scope="props">
                    <td>
                      <v-edit-dialog :return-value.sync="props.item.name" lazy>
                        {{props.item.name}}
                        <v-text-field slot="input" v-model="props.item.name"></v-text-field>
                      </v-edit-dialog>
                    </td>

                    <td>
                      <v-edit-dialog :return-value.sync="props.item.value" lazy>
                        {{props.item.value}}
                        <v-text-field slot="input" v-model="props.item.value"></v-text-field>
                      </v-edit-dialog>
                    </td>

                    <td class="justify-center layout px-0">
                      <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                      </v-btn>
                    </td>
                  </template>
                </v-data-table>
                <v-layout>
                  <v-flex sm1>
                    <v-btn @click="addParamter">Add Row
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
        parameters: [{
          name: '',
          value: ''
        }],
        paramHeader: [
          {text: 'Name', value: 'name'},
          {text: 'Value', value: 'name'}
        ],
        error: ''
      }
    },
    methods:
      {
        submit() {
          this.$http.post('/api/httpEndpoints', {
            Name: this.name,
            Method: this.method.text,
            URL: this.URL,
            Threshold: parseInt(this.threshold),
            Parameters: this.parameters
          }).then(response => {
            this.$router.push({path: '/dashboard/http'})
          }, response => {
            return response.json()
          }).then(json => {
            this.error = json.error

          })
        }
        ,
        addParamter() {
          this.parameters.push({name: '', value: ''})
        },
        deleteItem(item){
          const index = this.parameters.indexOf(item)
          this.parameters.splice(index, 1)

        }
      }
  }
</script>

<style scoped>

</style>

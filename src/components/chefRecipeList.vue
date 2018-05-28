<template>
  <v-flex lg-12>
    <v-alert :value="error" type="error">
      {{ this.error }}
    </v-alert>
    <v-data-table :headers="headers" :items="items">
      <template slot="items" slot-scope="props">
        <tr>
          <td v-for="cell in Object.values(props.item)">
            {{ cell }}
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-card height="0px">
      <v-btn
        absolute
        dark
        bottom
        left
        color="pink"
        @click="addNew"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          New Chef Recipe
        </v-card-title>
        <v-card-text>
          <v-alert :value="saveError" type="error">
            {{ this.saveError }}
          </v-alert>
          <v-form>
            <v-text-field v-model="recipeName" required label="Recipe Name" hint="The name of the recipe as it appears on Chef. i.e. 'MainWeb'"></v-text-field>
            <v-text-field v-model="friendlyName" required label="Friendly Name" hint="A more user friendly name to describe your recipe. i.e. 'Main website cookbook'"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="saveNew">Save</v-btn>
          <v-btn color="secondary" flat  @click.stop="dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-flex>
</template>

<script>
  export default {
    name: "chefRecipeList",
    data() {
      return {
        headers: [],
        items: [],
        error: null,
        saveError: null,
        dialog: false,
        recipeName: '',
        friendlyName: ''

      }
    },
    mounted() {
      this.getdata()
    },
    methods: {
      addNew() {
        this.dialog = true
      },
      saveNew()  {
        this.saveError = null
        this.$http.post('/api/chef/recipe',{RecipeName: this.recipeName, FriendlyName: this.friendlyName}).then(
          response => {
            this.dialog = false
            this.getdata()
          },
          response => {
            return response.json()
          }
        ).then( json => {
          if (json){
            this.saveError = json.error
          }
        })
      },
      getdata() {
        this.$http.get("/api/chef/recipes").then(response => {
          return response.json()
        }, response => {
          return response.json()
        }).then(json => {
          if (json.error){
            this.error = json.error
          } else {
            if (json.length > 0) {
              let o = json[0]
              let v = Object.keys(o)
              this.headers = []
              for (let i = 0; i < v.length; i++) {
                this.headers.push({text: v[i], value: 'props.item.' + v[i]})
              }
              this.items = json
            }

          }
        })
      }
    },
  }
</script>

<style scoped>

</style>

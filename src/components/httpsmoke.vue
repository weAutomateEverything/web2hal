<template>
    <v-flex sm12>

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
    </v-flex>
</template>

<script>
  export default {
    name: 'httpsmoke',
    data() {
      return {
        headers: [],
        items: []
      }
    },
    mounted() {
      this.$http.get('http://localhost:8000/httpEndpoints', '').then(response => {
        return response.json()
      }).then(json => {
        this.items = json
        if (json.length > 0) {
          let o = json[0]
          let v = Object.keys(o)
          this.headers = []
          for (let i = 0; i < v.length; i++) {
            this.headers.push({text: v[i], value: 'props.item.' + v[i]})
          }
        }
      })
    },
    methods: {
      addNew() {
        this.$router.push({path: '/dashboard/http/add'})
      }
    },
  }
</script>

<style scoped>

</style>

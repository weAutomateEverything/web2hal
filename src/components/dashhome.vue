<template>
  <div>Hello World - {{key}}</div>
</template>

<script>
export default {
  name: 'dashhome',
  data() {
    return {
      key: window.localStorage.getItem('token')
    }
  }
}
</script>

<style scoped>

</style>

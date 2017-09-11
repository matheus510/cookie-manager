<template>
  <div id="app">
    <img src="./assets/icon.svg" width="200" height="200">
    <h1>{{ msg }}</h1>
    <datepicker></datepicker>
    
  </div>
</template>

<script>
import Datepicker from './Datepicker.vue'
export default {
  name: 'app',
  components: {
    Datepicker
  },
  data () {
    return {
      msg: 'Cookie Manager'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

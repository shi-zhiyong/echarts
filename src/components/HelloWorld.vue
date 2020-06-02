<template>
  <div class="hello">
    <router-link to="helloWorld">helloWorld</router-link>
    <router-link to="echart">echarts</router-link>
    <router-link to="amap">amap</router-link>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

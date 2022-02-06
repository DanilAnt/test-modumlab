<template>
  <Home />
</template>

<script>
import Home from './components/Home.vue'
import './assets/scss/reset.scss'
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 1200px;

}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
/*background: url("~@/assets/images/bg.png") 0 0 / 100% 100% no-repeat;*/
/*background: url("./assets/images/background.png") 0 0 / 100% 100% no-repeat;*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 1200px;
  max-width: 2048px;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;
  display: flex;
  color: #080029;
  background-color:#080029
}
</style>

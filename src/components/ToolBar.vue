<template>
  <v-app-bar color="white">
    <v-app-bar-nav-icon @click="showBarMenu()" />
    <v-toolbar-title>{{$store.state.titleToolBar}}</v-toolbar-title>
  </v-app-bar>
</template>

<script>

export default {
  name: "ToolBar",

  data: () => ({

  }),
  methods:{
    showBarMenu(){
      this.$store.state.show = !this.$store.state.show
    }
  }
}

</script>

<style scoped>

</style>
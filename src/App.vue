<template>
  <v-app class="bg-grey-lighten-3">
    <BarMenu/>
    <ToolBar/>
    <v-main class="full-screen">
      <v-container fluid class="fill-height pa-0">

        <router-view/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import BarMenu from './components/BarMenu.vue'
import ToolBar from './components/ToolBar.vue';

export default {
  name: 'App',

  components: {
    ToolBar,
    BarMenu
  },

  data: () => ({
    //
  }),
}
</script>

<style>
.full-screen{
  min-height: 100vh;
}

</style>
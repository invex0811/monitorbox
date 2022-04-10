<template>
  <v-row class="fill-height" no-gutters>
    <v-hover
        v-slot="{isHovering, props}"
        v-for="({title,link,src}, i ) in $store.state.menu"
        :key="i"
    >
      <v-col
          v-bind="props"
          :cols="isHovering ? 12 / $store.state.menu.length + 2 : ''"
          class="transition"
      >
        <router-link
            class="text-decoration-none"
            :to="link"
            @click="$store.state.titleToolBar = title"
        >
            <v-img
                :src="src"
                min-height="100%"
                cover

            >
                <div
                    :class="[isHovering ? 'on-hover' : 'background',' fill-height transition d-flex align-center justify-center text-h2 text-white']"
                >
                  {{title}}
                </div>
            </v-img>
        </router-link>
      </v-col>
    </v-hover>
  </v-row>

  <router-view/>
</template>

<script>
export default {
  name: "Home",
  data: () => ({

  }),
  computed:{

  }
}
</script>

<style scoped>
.transition{
  transition: .3s;

}
.on-hover{
  background: rgba(0,0,0,.3);
}
.background{
  background: rgba(0,0,0,.7);
}

</style>
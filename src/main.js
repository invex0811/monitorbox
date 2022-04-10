import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store/store.js'
import router from './router'


loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')



//Динамическое изменение заголовка вкладки и бара
router.beforeEach((to, from, next) => {
    if (to.name) {
        document.title = to.name;
        store.state.titleToolBar = to.name
    }
    next();
})
import { createApp } from 'vue'
import './style.css'

//import from the 'default' object from the 'general' App.vue file - a vue file
import AppName from './App.vue'

//pinia instance for data
import { createPinia } from 'pinia'

import MenuItemComp from './components/MenuItemComp.vue'

//setting a constant for the imported 'main/global' AppName
const WatZullenWeEtenApp = createApp(AppName);

//setting a constant for the imported 'createPinia' call it : pinia
const pinia = createPinia()

//import related components
WatZullenWeEtenApp.component('menu-item-comp', MenuItemComp);

//adding pinia
WatZullenWeEtenApp.use(pinia)

//mount to <div> with id #app
WatZullenWeEtenApp.mount('#app')

import { createApp } from 'vue'

import './assets/scss/main.scss'

import iconHome from "./assets/images/home.svg"

console.log(iconHome)

//import from the 'default' object from the 'general' App.vue file - a vue file
import AppName from './App.vue'

//pinia instance for data
import { createPinia } from 'pinia'

//import router - createRouter and history.. from 'vue-router' npm dependancy
import router from './router';

//pages
import MenuItemComp from './components/MenuItemComp.vue'

//components
import MenuItemComp from './components/MenuItemComp.vue'
import NavigationComp from './components/NavigationComp.vue'

//setting a constant for the imported 'main/global' AppName
const WatZullenWeEtenApp = createApp(AppName);

//setting a constant for the imported 'createPinia' call it : pinia
const pinia = createPinia()

//import related components
WatZullenWeEtenApp.component('menu-item-comp', MenuItemComp);
WatZullenWeEtenApp.component('navigation-comp', NavigationComp);

//adding router
WatZullenWeEtenApp.use(router);

//adding pinia
WatZullenWeEtenApp.use(pinia)

//mount to <div> with id #app
WatZullenWeEtenApp.mount('#app')

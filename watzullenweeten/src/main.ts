import { createApp } from 'vue'

import './assets/scss/main.scss'

import iconHome from "./assets/images/home.svg"

//import from the 'default' object from the 'general' App.vue file - a vue file
import AppName from './App.vue'

//pinia instance for data
import { createPinia } from 'pinia'

//import router - createRouter and history.. from 'vue-router' npm dependancy
import router from './router';

//components
import MenuItemComp from './components/MenuItemComp.vue'
import NavigationComp from './components/NavigationComp.vue'
import FilterCheckboxComp from './components/forms/FilterCheckboxComp.vue'
import WaiCheckBoxComp from './components/forms/WaiCheckBoxComp.vue'


//setting a constant for the imported 'main/global' AppName
const WatZullenWeEtenApp = createApp(AppName);

//setting a constant for the imported 'createPinia' call it : pinia
const pinia = createPinia()

//connect components to app instance
WatZullenWeEtenApp.component('filtercheckbox-comp', MenuItemComp);
WatZullenWeEtenApp.component('navigation-comp', NavigationComp);
WatZullenWeEtenApp.component('filter-checkbox-comp', FilterCheckboxComp);

//adding router
WatZullenWeEtenApp.use(router);

//adding pinia
WatZullenWeEtenApp.use(pinia)

//mount to <div> with id #app
WatZullenWeEtenApp.mount('#app')

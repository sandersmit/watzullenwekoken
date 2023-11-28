// //import router - createRouter and history.. from 'vue-router' npm dependancy
import { createRouter } from 'vue-router';
import { createWebHashHistory } from 'vue-router';

// //import all pages
import MainPage from '../views/MainPage.vue';
import LabPage from '../views/LabPage.vue';
import PlaygroundPage from '../views/PlaygroundPage.vue';


//setting a constant for the imported 'vue-router' call it : router
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:"/",
            component: MainPage
        },
        {
            path:"/mainpage",
            component: MainPage
        },
        {
            path:"/LabPage",
            //component: () => import("@/views/AboutPage.vue")
            component: LabPage
        },
        {
            path:"/PlaygroundPage",
            //component: () => import("@/views/AboutPage.vue")
            component: PlaygroundPage
        }
        //,
        // {
        //     path:"/voertuigdetailpage/:voertuigidparam",
        //     //:passed prop :voertuigidparam
        //     //to component:VoertuigDetailpage
        //     //name:'VoertuigDetail',
        //     props: true,
        //     //component: () => import("@/views/VoertuigDetailPage.vue")
        //     component: VoertuigDetailPage
        // }
    ],                                                                          
});

export default router;

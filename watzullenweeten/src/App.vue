<script setup lang="ts">
import { reactive,computed,defineProps,ref, onMounted } from "vue";

import MenuItemComp from './components/MenuItemComp.vue';

import { useFoodStore } from './stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const foodStore = useFoodStore();
const { currentFood, reactiveFoodMenuDetails } = storeToRefs(useFoodStore()); 

//METHODS
foodStore.fetchFoodCategorie();
//foodStore.fetchFoodId(targetRandomMenuID())

function newFetch(){
  foodStore.fetchFoodCategorie();
// 
}
//newFetch()

function getRandomId(max:number) {
  randomIdMenuRef.value = Math.floor(Math.random() * max);
  return randomIdMenuRef.value
}

function targetRandomMenuID(){
  //console.log(foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)])
  return foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)]
}

function fetchRandomMenuID(){
  foodStore.fetchFoodId(targetRandomMenuID())
}

function fetchAllids(){
    foodStore.getCategorieFoodMenu.forEach(addcategorieIds);
        function addcategorieIds(item, index){
          foodStore.fetchCategorieIds(item)
        }
}

function showImg(){
 console.log("show imgs");  
 return 
}

//COMPUTED
const computeTitle = computed(function(){
  //console.log(foodStore.getFoodMenuTitle)
  //foodStore.getFoodMenuTitle;
  return foodStore.getFoodMenuTitle;
})

const computeCategorie = computed(function(){
  fetchAllids()
  return foodStore.getCategorieFoodMenu;
})

// const computeMenuValue = computed(function(){
//   return foodStore.getFoodMenuValue;
// })

const computeAllids = computed(function(){
  console.log("reset state.reactiveFoodAllIds with dispatch")
  foodStore.$patch((state) => {
  state.reactiveFoodAllIds.length = 0;
  })
  return foodStore.getAllIds;
})

const computeRandomId = computed(function(){
  //console.log(getRandomId(199))
  return getRandomId(199)
})

const showInstructions = computed(function(){
  for(var key in foodStore.reactiveFoodMenuDetails.meals) {
  //  console.log("test test")
  return foodStore.getFoodMenuValue.meals[0].strInstructions;
  }
})

onMounted(() => {
 console.log("onMounted?")
 fetchRandomMenuID()
 //foodStore.fetchFood();
 //foodStore.fetchFoodId();
 //foodStore.fetchFoodCategorie();
})

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
    <div class="results"> 
      <button @click="foodStore.fetchFoodCategorie()">fetch categorie</button>
      <!-- <button @click="foodStore.fetchFoodId()">fetch FoodId</button> -->
      <button @click="getRandomId(computeAllids.length)">randomID{{computeRandomId}}</button>
      <button @click="fetchRandomMenuID()">pickMenu</button>
      <button @click="newFetch()">new fetch</button>
                <!-- <h5>{{ currentFood }}</h5> -->
                <h1>computeTitle:{{ computeTitle[0] }}</h1>
                <h5 v-if="computeCategorie.length>0">total Categories: {{computeCategorie.length}}</h5>
                <h2>{{ computeCategorie[0] }}</h2>
                <!-- <div>{{computeMenuValue}}</div> -->
                <h5>total menus: {{computeAllids.length}}</h5>
                <div>{{computeAllids}}</div>
                <h3>instructions</h3>
                <div>{{ showInstructions }}</div>
                <img src="" alt="">
                <!-- <pre>
                  <code>
                    {{reactiveFoodMenuDetails.meals[0].strMeal}}
                  </code>
                </pre> -->
                <ul v-for="(food, index) in reactiveFoodMenuDetails.meals">
                   <li>{{ index }}{{ food.idMeal }}</li> 
                </ul>
                <ul v-for="(food, index) in reactiveFoodMenuDetails.meals">
                   <li>{{ food.strIngredient1}}</li> 
                   <li>{{ food.strIngredient2}}</li> 
                   <li>{{ food.strIngredient3}}</li> 
                   <li>{{ food.strIngredient4}}</li> 
                   <li>{{ food.strIngredient5}}</li> 
                   <li>{{ food.strIngredient6}}</li> 
                </ul>

                <menu-item-comp msg="We koken vandaag:" ref="userhistory" v-for="(food, index) in reactiveFoodMenuDetails.meals"
                    :key="index" :index-prop="index" :voertuig-id-prop="index" :voertuig-name-prop="food.merk"
                    :voertuig-soort-prop="food.voertuigsoort" :voertuig-kenteken-prop="food.kenteken"
                    :voertuig-handelsbenaming-prop="food.handelsbenaming">
                </menu-item-comp>
    </div>
  
</template>

<style>
body{
  place-items: baseline;
}
#app{
  width: 100%;
  padding: 1rem;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

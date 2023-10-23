<script setup lang="ts">
import { reactive,computed,defineProps,ref,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';
import NavigationComp from "../components/NavigationComp.vue";

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const foodStore = useFoodStore();
const { reactiveOrderMenus, reactiveFoodCategorie,reactiveFoodMenuDetails, categoriesFood, reactiveFoodCategorieAllId, reactiveFoodAllIdsState } = storeToRefs(useFoodStore()); 

//METHODS

//foodStore.getAllIds;
//foodStore.fetchFoodId(targetRandomMenuID())
foodStore.fetchFoodCategorie();


function getComputedIds(){
  if(categoriesFood.value.length > 0){
        for(var key in categoriesFood.value) {
        console.log(key)
        console.log(categoriesFood.value[key])
        foodStore.fetchCategorieIds(categoriesFood.value[key])
        }
    }
   return reactiveFoodCategorieAllId.value;
}


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

//COMPUTED
const computeTitle = computed(function(){
  //console.log(foodStore.getFoodMenuTitle)
  //foodStore.getFoodMenuTitle;
  return foodStore.getFoodMenuTitle;
})

const computeCategorie = computed(function(){
    //fetchAllids()
    console.log("reactiveFoodCategorie..", reactiveFoodCategorie.value.categories)
    if(reactiveFoodCategorie.value.categories){
            console.log("oke")
            console.log("computeCategorie..", foodStore.getCategorieFoodMenu)
            return foodStore.getCategorieFoodMenu;
    } 
})


// const computeMenuValue = computed(function(){
//   return foodStore.getFoodMenuValue;
// })

const computeFetchedids = computed(function(){
    console.log("computeFetchedids..", reactiveFoodAllIdsState.value)
    //return reactiveFoodCategorieAllId.value;
    return reactiveFoodAllIdsState.value;
    // console.log("reset state.reactiveFoodCategorieAllId with dispatch")
    //   foodStore.$patch((state) => {
    //   state.reactiveFoodCategorieAllId.length = 0;
    //   })
})

const computeShowAllIds = computed(function(){
    console.log("computeShowALlIds..")
    if(computeCategorie){
       // getComputedIds()
        return foodStore.getAllIds;
    }
})

const showInstructions = computed(function(){
    console.log("showInstructions..")
  for(var key in reactiveFoodMenuDetails.value.meals) {
    
  return foodStore.getFoodMenuValue.meals[0].strInstructions;
  }
})

//WATCHERS
watch(computeCategorie, () => {
  if ( computeCategorie ){
        console.log("watch - triggered computeCategorie", computeCategorie.value);
        getComputedIds()
       
    }
})

onMounted(() => {
 console.log("onMounted?", reactiveOrderMenus.value[0])

 //fetchRandomMenuID()
 //foodStore.fetchFood();
 //foodStore.fetchFoodId();
 //foodStore.fetchFoodCategorie();
})

</script>

<template>
     <menu-item-comp msg="We koken vandaag??"/>

    <div class="results"> 
      <button @click="foodStore.fetchFoodCategorie()">fetch categorie</button>
      <!-- <button @click="foodStore.fetchFoodId()">fetch FoodId</button> -->
      <button @click="getComputedIds()">get all id's {{ computeFetchedids.length }}</button>
      <button @click="fetchRandomMenuID()">pickMenu</button> pickedMenu is {{randomIdMenuRef}}
      <!-- <button @click="newFetch()">new fetch</button> -->
                <!-- <h5>{{ currentFood }}</h5> -->
                <h1>computeTitle:{{ computeTitle[0] }}</h1>
                <h5 v-if="computeCategorie">total Categories: {{computeCategorie.length}}</h5>
                <h5 v-else  > no categories yet</h5>
                <h2>{{ computeCategorie }}</h2>
                <!-- {{ categoriesFood.length }} -->

                {{ computeShowAllIds }}

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
    </div>
  
</template>

<style >

</style>

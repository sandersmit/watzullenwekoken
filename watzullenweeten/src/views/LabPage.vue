<script setup lang="ts">
import { reactive,computed,defineProps,ref,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';
import NavigationComp from "../components/NavigationComp.vue";

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const foodStore = useFoodStore();
const { reactiveFoodCategorie,reactiveFoodMenuDetails, categoriesFood, reactiveFoodCategorieAllId, reactiveFoodAllIdsState } = storeToRefs(useFoodStore()); 


//METHODS

//foodStore.getAllIds;
//foodStore.fetchFoodId(targetRandomMenuID())
//foodStore.fetchFoodCategorie();



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

// function showImg(){
//  console.log("show imgs");  
//  return 
// }

function getRandomId(max:number) {
  randomIdMenuRef.value = Math.floor(Math.random() * max);
  return randomIdMenuRef.value
}

function targetRandomMenuID(){
  console.log("targetRandomMenuID", foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)])
  return foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)]
}



function fetchRandomMenuID(){
    console.log("fetchRandomMenuID")
     foodStore.fetchFoodId(targetRandomMenuID())
    //console.log(response)
}

//await all catergoriesID's
async function fetchCategorieIds(arg){
    console.log("fetchCategorieIds")
    const response = await foodStore.fetchCategorieIds(arg)
    console.log(response)
    //if (response) {
        
        fetchRandomMenuID()
    //}
}
//await all catergories
async function loopcategoriesForIdfunction(){
        const response = await foodStore.fetchFoodCategorie();
        console.log(response.categories[0].strCategory);
        //when its done, do a foreach on the response - also awaiting 
        response.categories.forEach(newfunction);
        function  newfunction(item){
            console.log("loopcategoriesForIdfunction");
           fetchCategorieIds(item.strCategory)
         }
    }

//COMPUTED
const computeTitle = computed(function(){
  //console.log(foodStore.getFoodMenuTitle)
  //foodStore.getFoodMenuTitle;
  return foodStore.getFoodMenuTitle;
})

const computeCategorie = computed(function(){
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
    console.log("computeShowAllIds..")
        return foodStore.getAllIds;
})

const showInstructions = computed(function(){
    console.log("showInstructions..")
  for(var key in reactiveFoodMenuDetails.value.meals) {
    
  return foodStore.getFoodMenuValue.meals[0].strInstructions;
  }
})

//WATCHERS
// watch(computeCategorie, () => {
//   if ( computeCategorie ){
//         console.log("watch - triggered computeCategorie", computeCategorie.value);
//         getComputedIds()
       
//     }
// })

onMounted(() => {
 console.log("onMounted?")
 //fetchRandomMenuID()
 //foodStore.fetchFood();
 //foodStore.fetchFoodId();
 //foodStore.fetchFoodCategorie();
 loopcategoriesForIdfunction()
})

</script>

<template>
     <menu-item-comp msg="We koken vandaag:" ref="userhistory" v-for="(food, index) in reactiveFoodMenuDetails.meals"
                    :key="index" :index-prop="index" :voertuig-id-prop="index" :voertuig-name-prop="food.merk"
                    :voertuig-soort-prop="food.voertuigsoort" :voertuig-kenteken-prop="food.kenteken"
                    :voertuig-handelsbenaming-prop="food.handelsbenaming">
                </menu-item-comp>

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
                <h3>{{ categoriesFood.length }}</h3>

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

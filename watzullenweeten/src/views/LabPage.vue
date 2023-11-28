<script setup lang="ts">
import { reactive,computed,defineProps,ref,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const foodStore = useFoodStore();
const { reactiveFoodCategorie,reactiveFoodMenuDetails, categoriesFood, reactiveFoodCategorieAllId, reactiveFoodAllIdsState, alltitlesFromApi } = storeToRefs(useFoodStore()); 


//METHODS

//foodStore.getAllIds;
//foodStore.fetchRandomFoodId(targetRandomMenuID())
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
 // console.log("targetRandomMenuID", foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)])
  return foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)]
}

function fetchRandomMenuID(){
    // console.log("fetchRandomMenuID")
     foodStore.fetchRandomFoodId(targetRandomMenuID())
    //console.log(response)
}

function fetchAllMenuData(){
  console.log("fetchAllMenuData")
    //foodStore.fetchFoodId(reactiveFoodAllIdsState.value.length)
    for (let index = 0; index < 14; index++) {
         foodStore.fetchFoodId(reactiveFoodAllIdsState.value[index])
    }
    //reactiveFoodAllIdsState.value.forEach(fetchCategorieIds);
        // fetchCategorieIds(item,index)
        // {        
       // console.log("fetchAllMenuData",reactiveFoodAllIdsState.value.length)
       // foodStore.fetchFoodId(item)
       // }   
}

//await all catergoriesID's
async function fetchCategorieIds(arg, countArg){
    // console.log("fetchCategorieIds")
    const response = await foodStore.fetchCategorieIds(arg)
    console.log("countArg: ",countArg,categoriesFood.value.length)
   if(countArg == categoriesFood.value.length-1) {
     if (response) {
        console.log(reactiveFoodAllIdsState.value.length,"got allId's.. start pick on random menu")
        fetchAllMenuData()
        fetchRandomMenuID()
        }
    }
}
//await all catergories
async function loopcategoriesForIdfunction(){
        const response = await foodStore.fetchFoodCategorie();
        //console.log(response.categories[0].strCategory);
        //when its done, do a foreach on the response - also awaiting 
        console.log("got all ",response.categories.length,"categorie id's to loop trough")

        response.categories.forEach(newfunction);
        function  newfunction(item, index){
          console.log("loopcategoriesForIdfunction", index, response.categories.length);
           fetchCategorieIds(item.strCategory, index)
           if(response.categories.length-1 === index){
            console.log("Fire!")
           }
         }
    }

//COMPUTED
const computeTitles = computed(function(){
  //console.log(foodStore.getFoodMenuTitle)
  //foodStore.getFoodMenuTitle;
  return foodStore.getFoodMenuTitle;
})

const computeCategorie = computed(function(){
    //console.log("reactiveFoodCategorie..", reactiveFoodCategorie.value.categories)
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
    console.log("computeFetchedids..")
    //if(reactiveFoodAllIdsState.value.length < 50){
     //  console.log("more than 100",reactiveFoodAllIdsState.value.length);
    foodStore.getAllIds 
    //}
    //return reactiveFoodAllIdsState.value.length;
})


const computeFetchedIdTitles = computed(function(){
    return foodStore.getFoodMenuAllTitles;
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
 //foodStore.fetchRandomFoodId();
 //foodStore.fetchFoodCategorie();
 loopcategoriesForIdfunction()
 //console.log("total id's",reactiveFoodAllIdsState.value.length)

})

</script>

<template>
     <menu-item-comp msg="We koken vandaag:" ref="userhistory">
     </menu-item-comp>
    <div class="results"> 
      <button @click="foodStore.fetchFoodCategorie()">fetch categorie</button>
      <!-- <button @click="foodStore.fetchRandomFoodId()">fetch FoodId</button> -->
      <!-- <button @click="getComputedIds()">get all id's {{ computeFetchedids.length }}</button> -->
      <button @click="fetchRandomMenuID()">pickMenu</button> pickedMenu is {{randomIdMenuRef}}
      <!-- <button @click="newFetch()">new fetch</button> -->
                <!-- <h5>{{ currentFood }}</h5> -->
                <h1>computeTitle:{{ computeTitles[0] }}</h1>
                <h5 v-if="computeCategorie">total Categories: {{computeCategorie.length}}</h5>
                <h5 v-else  > no categories yet</h5>
                <h2>{{ computeCategorie }}</h2>
                <h3>{{ categoriesFood.length }}</h3>
                {{ computeFetchedids }}
               <h4>computeFetchedidTitles</h4>
                {{ computeFetchedIdTitles }}
                <hr>
                {{ alltitlesFromApi.length }}
                <h3>instructions</h3>
                <div>{{ showInstructions }}</div>
                <img src="" alt="">
                <!-- <pre>
                  <code>
                    {{reactiveFoodMenuDetails.meals[0].strMeal}}
                  </code>
                </pre> -->
                <ul v-for="(food, index) in reactiveFoodMenuDetails.meals">
                   <li>index: {{ index }} & id:{{ food.idMeal }}</li> 
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

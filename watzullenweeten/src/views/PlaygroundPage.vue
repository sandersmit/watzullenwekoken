<script setup lang="ts">
import { reactive ,computed ,defineProps ,ref,watch, onMounted } from "vue";

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const foodStore = useFoodStore();
const { reactiveOrderMenus, reactiveFoodCategorie,reactiveFoodMenuDetails, categoriesFood, reactiveFoodCategorieAllId, reactiveFoodAllIdsState } = storeToRefs(useFoodStore()); 

//METHODS
foodStore.fetchFoodCategorie();

function getComputedIds(){
  if(categoriesFood.value.length > 0){
        for(var key in categoriesFood.value) {
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
  return foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)]
}

function fetchRandomMenuID(){
  foodStore.fetchRandomFoodId(targetRandomMenuID())
}

//COMPUTED
const computeTitle = computed(function(){
  return foodStore.getFoodMenuTitle;
})

const computeCategorie = computed(function(){
    if(reactiveFoodCategorie.value.categories){
            return foodStore.getCategorieFoodMenu;
    } 
})

const computeFetchedids = computed(function(){
   //computeFetchedids..", reactiveFoodAllIdsState.value
    return reactiveFoodAllIdsState.value;
})

const computeShowAllIds = computed(function(){
    //computeShowALlIds
    if(computeCategorie){
        return foodStore.getAllIds;
    }
})

const showInstructions = computed(function(){
   //showInstructions
  for(var key in reactiveFoodMenuDetails.value.meals) {
  return foodStore.getFoodMenuValue.meals[0].strInstructions;
  }
})

//WATCHERS
watch(computeCategorie, () => {
  if ( computeCategorie ){
        //watch - triggered computeCategorie", computeCategorie.value
        getComputedIds()
       
    }
})
</script>

<template>

    <div class="results"> 
      <button @click="foodStore.fetchFoodCategorie()">fetch categorie</button>
      <button @click="getComputedIds()">get all id's {{ computeFetchedids.length }}</button>
      <button @click="fetchRandomMenuID()">pickMenu</button> pickedMenu is {{randomIdMenuRef}}
                <h1>computeTitle:{{ computeTitle[0] }}</h1>
                <h5 v-if="computeCategorie">total Categories: {{computeCategorie.length}}</h5>
                <h5 v-else  > no categories yet</h5>
                <h2>{{ computeCategorie }}</h2>
                {{ computeShowAllIds }}
                <h3>instructions</h3>
                <div>{{ showInstructions }}</div>
                <img src="" alt="">
                <pre>
                  <code>
                    {{reactiveFoodMenuDetails}}
                  </code>
                </pre>
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

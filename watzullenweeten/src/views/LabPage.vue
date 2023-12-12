<script setup lang="ts">
import { reactive,computed,defineProps,ref,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';
import FilterCheckboxComp from '../components/forms/FilterCheckboxComp.vue';

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
// const selectedCookType = ref("")
const selectedCookType = reactive({
        param1: "selectedCookType",
        param2: false,
        param3: 0
    })
   
const foodStore = useFoodStore();
const { reactiveFoodCategorie,reactiveFoodMenuDetails, categoriesFood, reactiveFoodCategorieAllId, reactiveFoodAllIdsState, alltitlesFromApi } = storeToRefs(useFoodStore()); 
const cookingTypes = ['afhalen','snel koken','uitgebreid koken']

//METHODS

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

function fetchAllMenuData(){
    for (let index = 0; index < 14; index++) {
         foodStore.fetchFoodId(reactiveFoodAllIdsState.value[index])
    }
}

function emitCheckboxValue(argument) {
            //console.log(`emited argument is : ${argument.thisSelected},${argument.thisCheckboxName} from ,custom event: emitCheckboxValue
            //   ,triggerd by the child component to parent component`)
          
            if(argument.thisSelected){
              selectedCookType.param1 = argument.thisCheckboxName;
              selectedCookType.param2 = argument.thisSelected;
              selectedCookType.param3 = argument.thisId;
            }else{
              selectedCookType.param1 = "nothing selected";
              selectedCookType.param2 = argument.thisSelected;
              selectedCookType.param3 = 0;
            }
           
            console.log("selected is:", selectedCookType.param3,selectedCookType.param1)
            
          }

//await all catergoriesID's
async function fetchCategorieIds(arg, countArg){
    const response = await foodStore.fetchCategorieIds(arg)
   if(countArg == categoriesFood.value.length-1) {
     if (response) {
        //"got allId's.. start pick on random menu"
        fetchAllMenuData()
        fetchRandomMenuID()
        }
    }
}
//await all catergories
async function loopcategoriesForIdfunction(){
        const response = await foodStore.fetchFoodCategorie();
        //when its done, do a foreach on the response - also awaiting 
        //got all ",response.categories.length,"categorie id's to loop trough"

        response.categories.forEach(newfunction);
        function  newfunction(item, index){
           fetchCategorieIds(item.strCategory, index)
         }
    }

//COMPUTED
const computeCookingType = computed(function(){
  return selectedCookType;
})

const computeTitles = computed(function(){
  return foodStore.getFoodMenuTitle;
})

const computeCategorie = computed(function(){
    if(reactiveFoodCategorie.value.categories){
      return foodStore.getCategorieFoodMenu;
    } 
})

const computeFetchedids = computed(function(){
    foodStore.getAllIds 
})

const computeFetchedIdTitles = computed(function(){
    return foodStore.getFoodMenuAllTitles;
})

const showInstructions = computed(function(){
  for(var key in reactiveFoodMenuDetails.value.meals) {
  return foodStore.getFoodMenuValue.meals[0].strInstructions;
  }
})

onMounted(() => {
 loopcategoriesForIdfunction()
})

</script>

<template>
  <form class="m-4" action="">
    <fieldset>
      <div class="row">
      <legend>type gerechten:</legend>
      </div>
      <div class="row">
        <filter-checkbox-comp v-for="(typeitem, index) in cookingTypes" :key="index" :checkbox-name-prop="typeitem"
                    :check-id-prop="index" :checkbox-value-prop="typeitem" @emit-checkbox-value="emitCheckboxValue">
                    </filter-checkbox-comp>
      </div>
  </fieldset>
</form>
     
     <menu-item-comp msg="We koken vandaag:" ref="userhistory" :menu-filter-val="computeCookingType">
     </menu-item-comp>
    <div class="results"> 
      <button @click="foodStore.fetchFoodCategorie()">fetch categorie</button>
      <button @click="fetchRandomMenuID()">pickMenu</button> pickedMenu is {{randomIdMenuRef}}
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
                <pre>
                  <code>
                    some data results ..
                    {{reactiveFoodMenuDetails}}
                  </code>
                </pre>
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
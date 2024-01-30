<script setup lang="ts">
import { reactive,computed,ref,onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';
import FilterCheckboxComp from '../components/forms/FilterCheckboxComp.vue';

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const filtercheckboxcompRef = ref(null)
const menuitemcompRef= ref(null)
const randomIdMenuRef = ref(0)


const selectedCookType = reactive({
        param1: "selectedCookType",
        param2: false,
        param3: null
    })
   
const foodStore = useFoodStore();
const { reactiveFoodCategorie,reactiveFoodMenuDetails, categoriesFood, reactiveFoodAllIdsState, alltitlesFromApi } = storeToRefs(useFoodStore()); 
const cookingTypes = ['Niet koken (afhalen)','Snel koken','Uitgebreid koken']

//METHODS
function setCheckbox(){
  if(this.checkIdProp==0){
  console.log(this.$refs.checkboxEl,this.checkIdProp)
  this.$refs.checkboxEl.checked;
  }
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

function fetchAllMenuData(){
    for (let index = 0; index < 14; index++) {
         foodStore.fetchFoodId(reactiveFoodAllIdsState.value[index])
    }
}

function emitCheckboxValue(argument) {
            //console.log(`emited argument is : ${argument.thisSelected},${argument.thisCheckboxName} from ,custom event: emitCheckboxValue
            //,triggerd by the child component to parent component`)
              selectedCookType.param1 = argument.thisCheckboxName;
              selectedCookType.param2 = argument.thisSelected;
              selectedCookType.param3 = argument.thisId;
              console.log("selected is:", 
              selectedCookType.param1, 
              selectedCookType.param2,
              selectedCookType.param3) 
          }

//await all catergoriesID's
async function fetchCategorieIds(arg, countArg){
    const response = await foodStore.fetchCategorieIds(arg)
   if(countArg == categoriesFood.value.length-1) {
     if (response) {
        //"got allId's.. start pick on random menu"
        fetchAllMenuData()
        //fetchRandomMenuID()
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

// const computeAllData = computed(function(){ 
//   return foodStore.getAllFoodMenuValues
// })

onMounted(() => {
 loopcategoriesForIdfunction()
})

</script>

<template>
  <div class="results">
    {{ selectedCookType }}
  </div>
  <form class="m-4" action="">
    <fieldset>
      <div class="row">
      <legend>type gerechten:</legend>
      </div>
      <div class="row">
        <filter-checkbox-comp ref="filtercheckboxcompRef" v-for="(typeitem, index) in cookingTypes" :key="index" :checkbox-name-prop="typeitem"
                    :check-id-prop="index" :checkbox-value-prop="typeitem" @emit-checkbox-value="emitCheckboxValue">
        </filter-checkbox-comp>
        <!-- <input type="checkbox" class="form-check-input" id="4" checked>    -->
      </div>
  </fieldset>
</form>
<!-- menuitemcompRef is a reference to "defineExpose method" to recieve a method or reactive state from child to parrent component -->
     <menu-item-comp used-on-page="lab" msg="We koken vandaag:" ref="menuitemcompRef" :menu-filter-val-prop="selectedCookType">
     </menu-item-comp>
    <div class="results"> 
      <button @click="filtercheckboxcompRef.defineExposeMethod">defineExpose method - FilterCheckboxComp</button>
      <button @click="menuitemcompRef.defineExposeMethod2">defineExpose method - MenuItemComp</button>
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
                <!-- <div>{{ showInstructions }}</div> -->
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
    <section class="results testing">
    <div>
      <!-- <ul class="allMenus">
          <li v-for="(datail, index) in computeAllData" :key="index" >
            MenuDetails:{{ index }}{{ datail.strInstructions}}</li> 
        </ul> -->
    </div>
    <hr>
    all loaded titles:{{ alltitlesFromApi.length }} 
    <hr>
    aantal id's:{{ computeFetchedids}}
    <hr>
    id's?:{{ reactiveFoodAllIdsState[0] }}
  </section>
</template>
<script setup lang="ts">
import { computed,ref,reactive,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';
import FilterCheckboxComp from '../components/forms/FilterCheckboxComp.vue';

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const count = ref(0)
//Vite Env Variables are type:string - convert it to boolean
const envLocal = ref(import.meta.env.VITE_env_local=="false"?false:true)

const foodStore = useFoodStore();
const { reactiveFoodCategorie, reactiveFoodAllIdsState, reactviefoodOrigin} = storeToRefs(useFoodStore()); 
const cookingTypes = ['Niet koken (afhalen)','Snel koken','Uitgebreid koken']
//const cookingTypes = ['Niet koken (afhalen)','Snel koken','Uitgebreid koken','Big data (all)', 'Big data > 100']

const selectedCookType = reactive({
        param1: "selectedCookType",
        param2: false,
        param3: null
    })

 
  
//METHODS
// function getRandomId(max:number) {
//   randomIdMenuRef.value = Math.floor(Math.random() * max);
//   return randomIdMenuRef.value
// }

// function targetRandomMenuID(){
//   return foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)]
// }

// function fetchRandomMenuID(){
//   foodStore.fetchRandomFoodId(targetRandomMenuID())
// }

function emitCheckboxValue(argument) {
            // console.log(`emited argument is : ${argument.thisSelected},${argument.thisCheckboxName} from ,custom event: emitCheckboxValue
            // //,triggerd by the child component to parent component`)
              selectedCookType.param1 = argument.thisCheckboxName;
              selectedCookType.param2 = argument.thisSelected;
              selectedCookType.param3 = argument.thisId;
            foodStore.showAllAction(argument.thisId,  argument.thisSelected )
          }
        
function fetchAllMenuData(idArg){
    foodStore.fetchFoodId(idArg)
}

// //await all catergoriesID's - then fetch all menu id's 
async function fetchCategorieIds(arg, countArg){
  //get all id's of each categorie
  const response = await foodStore.fetchCategorieIds(arg)
  count.value++
  //console.log("get all id's of each categorie",response.meals, count.value, countArg)
  response.meals.forEach((element, index) => {
  //  console.log("index",index, element)
  // details van eerste 10 gerechten per categorie
  // anders crashed de server door error 'too many requests at once..' totaal 302 menu's
  //de eerste 10 van de toaal aantal id's  
    if ( (envLocal.value == false) && (index < 10)  ) {
              fetchAllMenuData(element.idMeal)
             }
    else if ((envLocal.value == true) && (index < 1 )) {
              //fetch 1 static json if it is local dev
              fetchAllMenuData(element.idMeal)
             }
   });
}

// //await all catergories - > then fetch all categorie id's 
async function loopcategoriesForIdfunction(){ 
          const response = await foodStore.fetchFoodCategorie();
           //when its done, do a foreach on the response - also awaiting 
          //got all ",response.categories.length,"categorie id's to loop trough"
          
          //fetch random menu id istead of the first default
          //fetchRandomMenuID()

          //loop trough all categories
          response.categories.forEach(newfunction);
            function newfunction(item, index){
            //fetch first 3 categorieID's if its NOT local env
             if ((index < 3) && (envLocal.value == false)) {
              fetchCategorieIds(item.strCategory, index)
             }
             else if ((index < 1) && (envLocal.value == true)) {
              //fetch 1 static json if it is local dev
              fetchCategorieIds(item.strCategory, index)
             } else {
              return 
             }
             
            }
    }

//COMPUTED
const computeCategorie = computed(function(){
    if(reactiveFoodCategorie.value.categories){
      return foodStore.getCategorieFoodMenu;
    } else{
      return null
    }
})

const computeMenuOrigin = computed(function()
{
  let uniqueOrigins = foodStore.getAllApiFoodOrigins.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  });
    return uniqueOrigins
})

const computeFetchedids = computed(function(){
    return foodStore.getAllIds
})

const computeAlltitlesFromApi = computed(function(){
    return foodStore.alltitlesFromApi 
})

//WATCHERS
watch(computeCategorie, () => {
})

watch(computeFetchedids, () => {
})

watch(computeAlltitlesFromApi, () => {
})



onMounted(() => {
//resetting the id's when page refresh
reactiveFoodAllIdsState.value.length = 0
 loopcategoriesForIdfunction()
})

</script>
<template>
  <form class="my-1 m-4" action="">
    <fieldset>
      <legend>Select food origin:</legend>
          <div class="row">
            <filter-checkbox-comp v-for="(typeitem, index) in computeMenuOrigin" :key="index+100" :checkbox-name-prop="typeitem"
                        :check-id-prop="index+100" :checkbox-value-prop="typeitem" :show-number-bool-prop="false" @emit-checkbox-value="emitCheckboxValue">
            </filter-checkbox-comp>
          </div>
    </fieldset>
    <fieldset>
      <legend>Select cooking type:</legend>
        <div class="row">
          <filter-checkbox-comp ref="filtercheckboxcompRef" v-for="(typeitem, index) in cookingTypes" :key="index" :checkbox-name-prop="typeitem"
                      :check-id-prop="index" :checkbox-value-prop="typeitem" :show-number-bool-prop="true" @emit-checkbox-value="emitCheckboxValue">
          </filter-checkbox-comp>
        </div>
    </fieldset>
  </form>
     <menu-item-comp used-on-page="main" btnmsg="Wat koken we vandaag" ref="menuitemcompRef" :menu-filter-val-prop="selectedCookType" :filters-total="cookingTypes.length">
     </menu-item-comp>
</template>

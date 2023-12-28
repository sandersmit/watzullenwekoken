<script setup lang="ts">
import { computed,ref,reactive,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';
import FilterCheckboxComp from '../components/forms/FilterCheckboxComp.vue';

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const foodStore = useFoodStore();
const { reactiveFoodCategorie, categoriesFood , reactiveFoodAllIdsState, alltitlesFromApi } = storeToRefs(useFoodStore()); 
const cookingTypes = ['Niet koken (afhalen)','Snel koken','Uitgebreid koken']

const selectedCookType = reactive({
        param1: "selectedCookType",
        param2: false,
        param3: null
    })

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
  //fetchAllMenuData
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
              // console.log("selected is:", 
              // selectedCookType.param1, 
              // selectedCookType.param2,
              // selectedCookType.param3) 
          }

// //await all catergoriesID's
async function fetchCategorieIds(arg, countArg){
    const response = await foodStore.fetchCategorieIds(arg)
   if(countArg == categoriesFood.value.length-1) {
     if (response) {
        fetchAllMenuData()
        fetchRandomMenuID()
        }
    }
}
// //await all catergories
async function loopcategoriesForIdfunction(){
        const response = await foodStore.fetchFoodCategorie();
        //when its done, do a foreach on the response - also awaiting 
        //got all ",response.categories.length,"categorie id's to loop trough"

        response.categories.forEach(newfunction);
        function  newfunction(item:any, index:any){
        //loopcategoriesForIdfunction
           fetchCategorieIds(item.strCategory, index)
         }
    }

//COMPUTED
const computeCategorie = computed(function(){
    if(reactiveFoodCategorie.value.categories){
      return foodStore.getCategorieFoodMenu;
    } 
})

const computeFetchedids = computed(function(){
    return foodStore.getAllIds 
})

const computeFetchedIdTitles = computed(function(){
    return foodStore.getFoodMenuAllTitles;
})

const computeAlltitlesFromApi = computed(function(){
    return foodStore.alltitlesFromApi 
})

//WATCHERS
watch(computeCategorie, () => {
})

watch(computeFetchedids, () => {
})

watch(computeFetchedIdTitles, () => {
})

watch(computeAlltitlesFromApi, () => {
})

onMounted(() => {
 loopcategoriesForIdfunction()
})

</script>
<template>
   {{ alltitlesFromApi.length }}
  <form class="m-4" action="">
  <fieldset>
    <legend>Selecteer een kook type:</legend>
      <div class="row">
         <filter-checkbox-comp ref="filtercheckboxcompRef" v-for="(typeitem, index) in cookingTypes" :key="index" :checkbox-name-prop="typeitem"
                    :check-id-prop="index" :checkbox-value-prop="typeitem" @emit-checkbox-value="emitCheckboxValue">
        </filter-checkbox-comp>
      </div>
    </fieldset>
  </form>
     <menu-item-comp used-on-page="main" msg="We koken vandaag:" ref="menuitemcompRef" :menu-filter-val-prop="selectedCookType">
     </menu-item-comp>
</template>

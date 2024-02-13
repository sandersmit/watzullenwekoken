<script setup lang="ts">
import { computed,ref,reactive,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';
import FilterCheckboxComp from '../components/forms/FilterCheckboxComp.vue';

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const count = ref(0)
const foodStore = useFoodStore();
const { reactiveFoodCategorie, reactiveFoodAllIdsState} = storeToRefs(useFoodStore()); 
const cookingTypes = ['Niet koken (afhalen)','Snel koken','Uitgebreid koken','Big data (all)', 'Big data > 100']

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
            //console.log(`emited argument is : ${argument.thisSelected},${argument.thisCheckboxName} from ,custom event: emitCheckboxValue
            //,triggerd by the child component to parent component`)
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
    //offline 34.. chicken categorie..
  // details van eerste 2 gerechten per categorie // dus 27 totaal
  // anders crashed de server door error too many requests at once.. totaal 302 menu's
    if (index < 1) {
    //   console.log("count", count.value ,element.idMeal)
    fetchAllMenuData(element.idMeal)
    //  console.log("max 2 gerechten per categorie", 'index:',index, 'element:', element);
    }
   });
}

// //await all catergories - > then fetch all categorie id's 
async function loopcategoriesForIdfunction(){ 
          const response = await foodStore.fetchFoodCategorie();
           //when its done, do a foreach on the response - also awaiting 
          //got all ",response.categories.length,"categorie id's to loop trough"
          //console.log(response)
          //fetchRandomMenuID()
          response.categories.forEach(newfunction);
            function newfunction(item, index){
            //loopcategoriesForIdfunction
            // count.value++
           //  console.log("loopcategoriesForIdfunction", count.value)
             if (index < 1) {
             // console.log("fetchCategorieIds")
              fetchCategorieIds(item.strCategory, index)
             } 
             
            }
    }

//COMPUTED
const computeCategorie = computed(function(){
    if(reactiveFoodCategorie.value.categories){
      //console.log(foodStore.getCategorieFoodMenu)
      return foodStore.getCategorieFoodMenu;
    } else{
      return null
    }
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
  <form class="m-4" action="">
    <!-- <fieldset>
      <legend>Selecteer een categorie eten:</legend>
          <div class="row">
            <filter-checkbox-comp v-for="(typeitem, index) in computeCategorie" :key="index" :checkbox-name-prop="typeitem"
                        :check-id-prop="index" :checkbox-value-prop="typeitem" @emit-checkbox-value="emitCheckboxValue">
            </filter-checkbox-comp>
          </div>
    </fieldset> -->
    <fieldset>
      <legend>Selecteer een kook type:</legend>
        <div class="row">
          <filter-checkbox-comp ref="filtercheckboxcompRef" v-for="(typeitem, index) in cookingTypes" :key="index" :checkbox-name-prop="typeitem"
                      :check-id-prop="index" :checkbox-value-prop="typeitem" @emit-checkbox-value="emitCheckboxValue">
          </filter-checkbox-comp>
        </div>
    </fieldset>
  </form>
     <menu-item-comp used-on-page="main" btnmsg="We koken vandaag?" ref="menuitemcompRef" :menu-filter-val-prop="selectedCookType" :filters-total="cookingTypes.length">
     </menu-item-comp>
</template>

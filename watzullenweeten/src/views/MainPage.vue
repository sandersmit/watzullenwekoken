<script setup lang="ts">
import { reactive,computed,defineProps,ref,watch, onMounted } from "vue";

import MenuItemComp from '../components/MenuItemComp.vue';

import { useFoodStore } from '../stores/FoodStore';
import { storeToRefs } from "pinia"; 

const randomIdMenuRef = ref(0)
const foodStore = useFoodStore();
const { reactiveFoodCategorie,reactiveFoodMenuDetails, categoriesFood, reactiveFoodCategorieAllId, reactiveFoodAllIdsState, alltitlesFromApi } = storeToRefs(useFoodStore()); 

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
  return foodStore.getCategorieFoodMenu;
})

const computeFetchedids = computed(function(){
    return foodStore.getAllIds 
})

//WATCHERS
watch(computeCategorie, () => {
})

watch(computeFetchedids, () => {
})

onMounted(() => {
 loopcategoriesForIdfunction()
})

</script>
<template>
     <menu-item-comp msg="We koken vandaag..."/>
</template>

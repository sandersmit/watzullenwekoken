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

// function getComputedIds(){
//   if(categoriesFood.value.length > 0){
//         for(var key in categoriesFood.value) {
//         console.log(key)
//         console.log(categoriesFood.value[key])
//         foodStore.fetchCategorieIds(categoriesFood.value[key])
//         }
//     }
//    //return reactiveFoodCategorieAllId.value;
// }

function getRandomId(max:number) {
  randomIdMenuRef.value = Math.floor(Math.random() * max);
  return randomIdMenuRef.value
}

function targetRandomMenuID(){
  //console.log(foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)])
  return foodStore.getAllIds[getRandomId(foodStore.getAllIds.length)]
}

function fetchRandomMenuID(){
  foodStore.fetchRandomFoodId(targetRandomMenuID())
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

// //await all catergoriesID's
async function fetchCategorieIds(arg, countArg){
    // console.log("fetchCategorieIds")
    const response = await foodStore.fetchCategorieIds(arg)
    //console.log("countArg: ",countArg,categoriesFood.value.length)
   if(countArg == categoriesFood.value.length-1) {
     if (response) {
        console.log(reactiveFoodAllIdsState.value.length,"got allId's.. start pick on random menu")
        fetchAllMenuData()
        fetchRandomMenuID()
        }
    }
}
// //await all catergories
async function loopcategoriesForIdfunction(){
        const response = await foodStore.fetchFoodCategorie();
        //console.log(response.categories[0].strCategory);
        //when its done, do a foreach on the response - also awaiting 
        console.log("got all ",response.categories.length,"categorie id's to loop trough")

        response.categories.forEach(newfunction);
        function  newfunction(item, index){
        //  console.log("loopcategoriesForIdfunction", index, response.categories.length);
           fetchCategorieIds(item.strCategory, index)
           if(response.categories.length-1 === index){
         //   console.log("Fire!")
           }
         }
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
    //if(reactiveFoodCategorie.value.categories){
            console.log("oke")
      //console.log("computeCategorie..", foodStore.getCategorieFoodMenu)
            return foodStore.getCategorieFoodMenu;
    //} 
})

// const computeMenuValue = computed(function(){
//   return foodStore.getFoodMenuValue;
// })

const computeFetchedids = computed(function(){
   // console.log("computeFetchedids..")
    //if(reactiveFoodCategorieAllId){
    //console.log("more than 100",reactiveFoodAllIdsState.value.length);
    return foodStore.getAllIds 
   // }
    //return reactiveFoodAllIdsState.value.length;
})

//WATCHERS

watch(computeCategorie, () => {
  console.log("watch - triggered computeCategorie", computeCategorie);
  if ( computeCategorie ){
       // getComputedIds()
    }
})

watch(computeFetchedids, () => {
  if ( computeFetchedids ){
    console.log("watch - triggered computeFetchedids", computeFetchedids);
    }
})

onMounted(() => {
 loopcategoriesForIdfunction()
})

</script>

<template>
     <menu-item-comp msg="We koken vandaag..."/>
</template>

<style >

</style>

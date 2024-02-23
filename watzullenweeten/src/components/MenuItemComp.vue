<script setup lang="ts">
import { computed,ref, reactive ,defineExpose, watch, onMounted, onUpdated, nextTick} from "vue";
import gsap from 'gsap'

import { useFoodStore } from '../stores/Foodstore';
import { storeToRefs } from "pinia"; 

import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);
//import type CTAbuttonType from "../types/alltypes"

// defineProps<{ msg: string }>()
//Make Vue aware of the props
//use them with the this.propname - in the whole component. 
//write them with CAMEL case --and use them in the html with DASH - 
//To replace option - props:{} - use - defineProps({}) 
//Props are Reactive
const props =  defineProps({
    btnmsg: {
        type: String,
        default: "Edit Detailpage",
    },
    menuFilterValProp:{
        type: Object,
        //set required for TS
        required: true
    },
    filtersTotal:{
        type: Number,
        //set required for TS
        required: true
    },
    usedOnPage:{
      type: String,
      default:"lab"
    }

});

const foodStore = useFoodStore();
const {alltitlesFromApi,
   allMenuDetailsFromApi,
    reactiveFoodAllIdsState,
    reactiveFoodCategorieAllId,
    categoriesFood } = storeToRefs(useFoodStore()); 

//To replace the data(){}
const CTAbutton = ref();
const progress = ref(false)
const menuNumberRef = ref(0);
let intervalNumber = ref(500) // 1sec
const countdown = ref(5)
const intervalID = ref(0)
const titlesResults = ref([])
const totalFilters = ref(props.filtersTotal)
const currentSelectedFilters = ref([])
const selectedTitle = ref("etenswaren")
const showApiData = ref(false)
const ingredientsTotal = ref(0)
const step1 = ref();

//METHODS
function getRandomInt(max:number) {
  return menuNumberRef.value = Math.floor(Math.random() * max);
}

function giveNumber(){
  countdown.value--;
  return getRandomInt(titlesResults.value.flat().length);
}

function start(){
  progress.value=true;
  intervalID.value = setInterval(giveNumber, intervalNumber.value, "Parameter 1", "Parameter 2");
  step1.value.scrollIntoView()
  step1.value.classList.add('active')
}

function reset(){
  countdown.value = 5; 
  progress.value = false;
}

function initFilters(){
  for (let index = 0; index < totalFilters.value; index++) {
    currentSelectedFilters.value.push(false)
  }
}


function toggleClassname(event:Event){  
 const target = event.currentTarget as HTMLAnchorElement;
 target.classList.toggle("open");
 target.nextElementSibling?.classList.toggle("openthis");
//  event.preventDefault();
//  return false;
}


// function buttonStatus(){
//   if ( titlesResults.value.length != 0){
//       CTAbutton.value.disabled = false
//     }
//   else{
//     console.log("disabled")
//       CTAbutton.value.disabled = true
//     }
// }

const defineExposeMethod2 = () => console.log('defineExpose2');

//DEFINE_EXPOSE
defineExpose({
        defineExposeMethod2
       })

//COMPUTED
const computeTotalMenuTitles = computed(function(){
    //reset array to empty
    titlesResults.value = [];
    foodStore.getFoodMenuFiltered.forEach((element, index) => {
     titlesResults.value.push(element.menu)
    });
    return titlesResults.value.flat();
})

const computeSelectedTitle = computed(function(){
   selectedTitle.value = computeTotalMenuTitles.value[menuNumberRef.value]
   return selectedTitle.value
  })

const computeCheckIfApiTitle = computed(function(){
let thisItem = alltitlesFromApi.value.find(item => item == computeSelectedTitle.value)
  if (thisItem != undefined) {
    showApiData.value = true
    return showApiData.value
  } else {
    showApiData.value = false
    return showApiData.value
  }
})

const computeMenuFilter = computed(function(){
  currentSelectedFilters.value[props.menuFilterValProp.param3] = props.menuFilterValProp.param2;
    return currentSelectedFilters.value
})

const computeAllFoodMenuTitles = computed(function(){
    return foodStore.getAllApiFoodMenuTitles;
})

const computeAllFoodMenuValues = computed(function(){
    return foodStore.getAllApiFoodMenuValues;
})

const showInstructions = computed(function(){
  if (computeCheckIfApiTitle.value) {
    let objectValue = foodStore.getAllApiFoodMenuValues.find(item => item.strMeal == computeSelectedTitle.value)
    return [objectValue.idMeal, objectValue.strMeal, objectValue.strInstructions]
  }else {
    //console.log("no instruction values [placeholder?]")
    return null
  }
})

const showMenuIngredients = computed(function () {
  let arrayingredientValues;
  let item;
  if (computeCheckIfApiTitle.value) {
    for (const [key, value] of Object.entries(foodStore.getAllApiFoodMenuValues)) {
      if (value.strMeal == computeSelectedTitle.value) {
        //filter in object for sertain key names
        arrayingredientValues = Object.fromEntries(Object.entries(value).filter(([key, val]) => {
          //item returns boolean
          item = key.includes('strIngredient');
          //if true && empty string => dont return empty values
          if (item && val != '') {
            return item
          }
        }))
      }
    }
    ingredientsTotal.value = Object.keys(arrayingredientValues).length
    return arrayingredientValues
  }
  else {
    //console.log("no ingredients values [placeholder?]")
    return null
  }
})


const showMenuId = computed(function(){
  if (computeCheckIfApiTitle.value) {
    //console.log("showMenuId: menuNumberRef.value",menuNumberRef.value, foodStore.getAllApiFoodMenuValues)
    let findId = foodStore.getAllApiFoodMenuValues.find(item => item.strMeal == computeSelectedTitle.value)
      return findId.idMeal
  }else{
   // console.log("no id values [placeholder?]")
    return null
  }
})
//reactiveFoodCategorieAllId
const computeAllCategorieData = computed(function () {
  let arrayValues = [];
  for (const [key, value] of Object.entries(reactiveFoodCategorieAllId.value)) {
    //filter in object for sertain key names
    console.log("key", key, "value", value)
    arrayValues.push(value)
  }
  return arrayValues.flat()
})


//WATCHERS
watch(titlesResults, () => {
  //NextTick() is a vue special method 
  // that executes callback before mounted hook or 
  // computed functions , direct after the new data updates have reached DOM.
//  nextTick(() => {
//   // console.log("dom loaded")
//    // buttonStatus()
//   })

})

// watch(computeCheckIfApiTitle, () => {
// })

watch(computeAllFoodMenuTitles, () => {
})

watch(computeAllFoodMenuValues, () => {
})

watch(countdown, () => {
  if ( countdown.value == 0){ 
       //watch - triggered clearInterval", countdown.value
        clearInterval(intervalID.value );
        reset();   
    }
})

watch(menuNumberRef, () => {
  //watch number
  //replaces text:
  gsap.to(".highlight", {duration: 1, text: computeSelectedTitle.value, delay: 0});
})


onMounted(() => {
  CTAbutton.value.className = 'true'
  CTAbutton.value.disabled = true
  initFilters();
})

</script>

<template>
  <section class="content pt-1 pt-md-5" ref="step1">
    <Transition mode="out-in">
      <div v-if="!progress && computeTotalMenuTitles.length > 0" class="btnContainer my-4">
        <button ref="CTAbutton" type="button" title="Click to choose a random menu" name="Choose menu button" class="CTA" @click="start()">{{ props.btnmsg }}</button> 
      </div>
      <div v-else-if="computeTotalMenuTitles.length == 0" class="btnContainer my-4" >
        <button ref="CTAbutton" disabled type="button" title="Click to choose a random menu" name="Choose menu button" class="CTA" @click="start()">no selection</button>
      </div>
      <div v-else-if="progress && computeTotalMenuTitles.length > 0" class="btnContainer my-4">
           <h2 id="highlight" class="highlight">{{ computeSelectedTitle }}</h2>
      </div>
    </Transition>
   
        <div class="qmarkcontainer my-2 my-sm-4">
          <span class="qmarkincontainer">

          </span>
          <Transition name="fadeTrans" mode="out-in">
            <div class="questionmark my-md-4" aria-hidden="true" v-if="!progress">
              ?
            </div>
            <div class="questionmark sec my-md-4" aria-hidden="true" v-else>
             ?
            </div>
          </Transition>
         </div>
    
  </section>
  <section class="titleContainer"> 
    <h6>Totaal aantal menus 
      <span class="number">  
        {{ computeTotalMenuTitles.length }}
      </span>
    </h6>
    <div class="headermain">
      <Transition name="fadeTrans" mode="out-in">
      <h1 v-if="computeTotalMenuTitles.length > 0">
        We koken vandaag: 
        <Transition name="fadeTrans" mode="out-in">
        <div v-if="!progress" id="highlight">menu {{ menuNumberRef }}:  <span class="highlight">{{ computeSelectedTitle }}</span>
        </div>
        <div v-else>
          <span class="highlight2">waiting..</span>
        </div>
      </Transition>
      </h1>
      <h1 v-else>
        <div id="highlight">Selecteer een <span class="highlight">kook type</span></div>
      </h1>
      </Transition>
    </div>
  </section>
  <section class="menuDetails">
    <div class="idNumber" v-if="showMenuId!=null">Menu: {{ showMenuId }}</div>
    <div class="idNumber" v-else> No id found</div>
      <div>
        <div id="instructions" v-if="showInstructions != null">
          <a href="#" alt="Instructions" @click.prevent="toggleClassname($event)" class="accord py-md-2"  >
          <h3>Instructions</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e5e5e5" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <title>plus circle</title>
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </a> 
          <div class="toggleBox">
            <p>
              <span class="tag">{{ showInstructions[0]}}</span>
              <span class="tag">{{ showInstructions[1]}}</span>
              {{ showInstructions[2]}}
            </p>
          </div>
      </div>
    <div v-else>
      <h3>No instructions found</h3>
    </div>
  </div>
  <div v-if="showMenuIngredients != null">
    <a href="#" alt="ingredients" @click.prevent="toggleClassname($event)" class="accord py-md-2" >
    <h3>Ingredienten ({{ingredientsTotal}})</h3>     
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e5e5e5" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <title>plus circle</title>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </a> 
        <ul class="ingredients toggleBox">
            <li v-for="(ingredient, index) in showMenuIngredients" :key="index" >{{ingredient}}</li>
        </ul>
  </div>
  <div v-else>
    <h3>No Ingredients found</h3>     
  </div>
    <div v-if="computeMenuFilter[0] || computeMenuFilter[1] || computeMenuFilter[2]" >
      <a href="#" alt="All menus" @click.prevent="toggleClassname($event)" class="accord py-md-2" >
        <h3>All menus ({{titlesResults.flat().length}})</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e5e5e5" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <title>plus circle</title>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </a>
      <div class="toggleBox" ref="refTarget">
          <ul class="allMenus">
            <li v-for="(food, index) in titlesResults.flat()" :key="index" >Menu:{{ index }}
              {{ food}}</li> 
          </ul>
      </div>
    </div>
    <div v-else>
      <h3>No menus found</h3>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>

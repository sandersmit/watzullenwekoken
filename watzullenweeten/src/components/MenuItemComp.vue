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
}

function reset(){
  countdown.value = 5; 
  progress.value = false;
}

function initFilters(){
  for (let index = 0; index < totalFilters.value; index++) {
    currentSelectedFilters.value.push(false)
  }
  console.log("setFilters()", currentSelectedFilters.value)
}


function toggleClassname(event:Event){  
 const target = event.currentTarget as HTMLAnchorElement;
 target.classList.toggle("open");
 target.nextElementSibling?.classList.toggle("openthis");
}


function buttonStatus(){
  if ( titlesResults.value.length !== 0){
      console.log(computeTotalMenuTitles.value)
      CTAbutton.value.disabled = false
      console.log("props.menuFilterValProp.param3",props.menuFilterValProp.param3,CTAbutton.value)
    }
  else{
      console.log("CTAbutton.value.disabled = true")
      console.log("props.menuFilterValProp.param3",props.menuFilterValProp.param3,CTAbutton.value)
      CTAbutton.value.disabled = true
    }
}

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
   console.log("selectedTitle.value",selectedTitle.value, menuNumberRef.value)
   return selectedTitle.value
  })

const computeCheckIfApiTitle = computed(function(){
let thisItem = alltitlesFromApi.value.find(item => item == computeSelectedTitle.value)
  if (thisItem != undefined) {
    showApiData.value = true
    console.log("thisItem: ",thisItem,showApiData.value )
    return showApiData.value
  } else {
    showApiData.value = false
    console.log("thisItem: ",thisItem,showApiData.value )
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
    console.log(computeSelectedTitle.value)
    let objectValue = foodStore.getAllApiFoodMenuValues.find(item => item.strMeal == computeSelectedTitle.value)
    return [objectValue.idMeal,'-', objectValue.strMeal,':', objectValue.strInstructions]
  }else {
    console.log("no instruction values [placeholder?]")
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
            console.log(val)
            return item
          }
        }))
      }
    }
    ingredientsTotal.value = Object.keys(arrayingredientValues).length
    console.log("Object.keys(arrayingredientValues).length",ingredientsTotal.value)
    return arrayingredientValues
  }
  else {
    console.log("no ingredients values [placeholder?]")
    return null
  }
})


const showMenuId = computed(function(){
  if (computeCheckIfApiTitle.value) {
    //console.log("showMenuId: menuNumberRef.value",menuNumberRef.value, foodStore.getAllApiFoodMenuValues)
    let findId = foodStore.getAllApiFoodMenuValues.find(item => item.strMeal == computeSelectedTitle.value)
   
      return findId.idMeal
  }else{
    console.log("no id values [placeholder?]")
    return null
  }
})
//reactiveFoodCategorieAllId
const computeAllCategorieData = computed(function () {
  let arrayValues = [];
  //   if (computeCheckIfApiTitle.value) {
  for (const [key, value] of Object.entries(reactiveFoodCategorieAllId.value)) {
    //     //filter in object for sertain key names
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
 nextTick(() => {
  // console.log("dom loaded")
    buttonStatus()
  })
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
  <header v-if="props.usedOnPage=='lab'">
    <div>
      computeTotalMenuTitles?
    <!-- {{ computeTotalMenuTitles }} -->
    <hr>
    <!-- {{ computeAllFoodMenuTitles }} -->
    <hr>
    <!-- {{ foodStore.getAllApiFoodMenuValues[0] }} -->
    </div>
    <!-- <div v-if="props.menuFilterValProp.param3 == 0">
    {{ computeOrderMenu }}
    <hr>
    </div>
    <div v-else-if="props.menuFilterValProp.param3 == 1">
    {{ computeQuickMenu}}
    <hr>
    </div>
    <div v-else-if="props.menuFilterValProp.param3 == 2">
    {{ computeApiMenu }}
    <hr>
    </div> 
    <div class="py-3" v-else>
    choose menu type
    </div>
    -->
  </header>
  <section class="my-4">
    <button ref="CTAbutton" type="button" disabled class="CTA my-md-2" @click="start()">{{ props.btnmsg }}</button>
  </section>
  <section class="content">
    <Transition name="fadeTrans"> 
      <div v-if="!progress" class="qmarkcontainer">
        <span class="questionmark my-md-4">
          ?
        </span>
      </div>
    </Transition>
  </section>
  <header> 
    <h6>Totaal aantal menus?: 
      <span class="number">  
        {{ computeTotalMenuTitles.length }}
      </span>
    </h6>
    <div class="headermain">
      <!-- <Transition name="fadeTrans"> -->
      <h1 v-if="computeTotalMenuTitles.length > 0">
        <div id="highlight">menu {{ menuNumberRef }}:  <span class="highlight">{{ computeSelectedTitle }}</span></div>
      </h1>
      <h1 v-else>
        <div id="highlight">Selecteer een <span class="highlight">kook type</span></div>
      </h1>
      <!-- </Transition> -->
    </div>
    </header>
  <section class="menuDetails">
    <h4 v-if="showMenuId!=null">Menu: {{ showMenuId }}</h4>
    <h4 v-else> No id found</h4>
    <div >
    <div v-if="showInstructions != null">
      <a @click="toggleClassname($event)" class="accord py-md-2" >
      <h3>Instructions</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e5e5e5" class="bi bi-plus-circle" viewBox="0 0 16 16">
          <title>plus circle</title>
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </a> 
      <div class="toggleBox">
        <p>
          {{ showInstructions}}
        </p>
      </div>
    </div>
    <div v-else>
      <h3>No instructions found</h3>
    </div>
  </div>
  <div v-if="showMenuIngredients != null">
    <a @click="toggleClassname($event)" class="accord py-md-2" >
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
      <a @click="toggleClassname($event)" class="accord py-md-2" >
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
.highlightTrans-enter-active,
.highlightTrans-leave-active {
  transition: all 1.5s ease;
}

.highlightTrans-enter-from {
  transform: translateX(-1000px);
  opacity: 0;
}

.highlightTrans-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.highlightTrans-leave-to {
  opacity: 0;
  transform: translateX(1000px);
}

.fadeTrans-enter-active,
.fadeTrans-leave-active {
  transition: all 0.3s ease;
}

.fadeTrans-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.fadeTrans-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.fadeTrans-leave-to {
  transform: translateY(20px);
  opacity: 0;
}


//default vue class v-
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.v-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}


header {
  // margin-left: -2rem;
  // margin-right: -2rem;
  min-height: 350px;
  background-color: #155f3e;
  display: flex;
  flex-direction: column;
  
  .headermain{
    display: flex;
    align-items: center;
    flex-basis: auto;
    display: flex;
    justify-content: center;
    flex: 1;
  }

  h1 {
    padding: 0rem 1rem;
    word-break:break-word;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h6 {
    text-align: right;
    padding-right: 2rem;
    padding-top: 2rem;
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
  }
}
.toggleBox, .ingredients.toggleBox{
  transform: translateY(-20px);
  opacity: 0;
  height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  &.openthis{
    transform: translateY(0px);
    opacity: 1;
    height: auto;
    overflow:inherit;
    margin-bottom:1rem;
  }
}
.highlight {
  display: inline;
}
.ingredients{
  display: flex;
  justify-content: flex-start;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
    margin-block-start: 0px;
    padding-inline-start: 0px;
    margin-block-end: 0px;

  li{
    list-style: none;
    background: #242424;
    border-radius: 7px;
    padding: 0.5rem 1rem;
    margin:0.5rem 0.25rem;
    
  }
}
.allMenus{
  display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
  li{
    list-style: none;
  }
}



button {
  width: 300px;
  padding: 1rem;
  margin: 0 auto;
  align-self: end;
  font-weight: 600;
 
  font-family: monospace;
  margin-top: 2rem;
}

section {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  //padding: 2rem;
  justify-content: flex-start;

  &.content {
    min-height: 200px;
    justify-content: center;
  }
}

.menuDetails {
  padding: 2rem;
  background-color: #155f3e;
  color: #cac5c5;
  border-radius: 1rem;
}

.highlight {
  color: #35eb9a;
}

.questionmark {
  font-size: 9rem;
  font-weight: 600;
  width: 11rem;
    height: 11rem;
  position: relative;
  display: block;
  border-radius: 100%;
  padding:1rem;
  margin: 0px;
  line-height: 1em;
}

  .qmarkcontainer{
    width: 12rem;
    height: 12rem;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 100%;
    justify-content: center;
    margin:2rem;

        background: linear-gradient(218deg, #202020, #35eb9a);
        background-size: 400% 400%;

        -webkit-animation: AnimationName 7s ease infinite;
        -moz-animation: AnimationName 7s ease infinite;
        -o-animation: AnimationName 7s ease infinite;
        animation: AnimationName 7s ease infinite;
    }

    @-webkit-keyframes AnimationName {
        0%{background-position:91% 0%}
        50%{background-position:10% 100%}
        100%{background-position:91% 0%}
    }
    @-moz-keyframes AnimationName {
        0%{background-position:91% 0%}
        50%{background-position:10% 100%}
        100%{background-position:91% 0%}
    }
    @-o-keyframes AnimationName {
        0%{background-position:91% 0%}
        50%{background-position:10% 100%}
        100%{background-position:91% 0%}
    }
    @keyframes AnimationName {
        0%{background-position:91% 0%}
        50%{background-position:10% 100%}
        100%{background-position:91% 0%}
    }

.number {
  border-radius: 100%;
  margin: 0px;
  line-height: 0;
  margin-left: 2rem;
  min-height: 2rem;
  min-width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;    
}
</style>

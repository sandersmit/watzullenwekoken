<script setup lang="ts">
import { reactive,computed,defineProps,ref, watch, onMounted, setup } from "vue";
import gsap from 'gsap'

import { useFoodStore } from '../stores/Foodstore';
import { storeToRefs } from "pinia"; 


import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

// defineProps<{ msg: string }>()
//Make Vue aware of the props
//use them with the this.propname - in the whole component. 
//write them with CAMEL case --and use them in the html with DASH - 
//To replace option : props{} 
const props =  defineProps({
    msg: {
        type: String,
        default: "Edit Detailpage",
    }
});

const foodStore = useFoodStore();
const { reactiveOrderMenus, alltitlesFromApi, allMenuDetailsFromApi } = storeToRefs(useFoodStore()); 

//To replace the data(){}
const CTAbutton = ref(null)
//const refTarget = ref(null)
const progress = ref(false)
const toggleValue = ref(false);
const menuNumberRef = ref(0)
const totalApiMenuTitles = ref([])

const totalMenus = ref(
  ["poelier",
  "verse maaltijd deka",
  "verse slager maaltijd",
  "Soep met brood&smeersels",
  "Visboer gerecht",
  "Pannenkoeken & poffertjes",
  "Broodje hamburger",
  "Hotdogs",
  "Frituren",
  "Chickenwings"])

const intervalReducer = 0.5;
let intervalNumber = ref(500) // 1sec
const countdown = ref(5)
const intervalID = ref(0)
const menusReactive = reactive({
        param1: "some menu",
        param2: countdown.value,
        param3: [1,2,3,4],
    })

//METHODS
function getRandomInt(max:number) {
  return menuNumberRef.value = Math.floor(Math.random() * max);
}

function giveNumber(){
  countdown.value--;
  //new interval number", intervalNumber.value) // 0 
  return getRandomInt(alltitlesFromApi.value.length);
}

function start(){
  CTAbutton.value.disabled=true;
  progress.value=true;
  intervalID.value = setInterval(giveNumber, intervalNumber.value, "Parameter 1", "Parameter 2");
}

function reset(){
  countdown.value = 5; 
  CTAbutton.value.disabled=false;
  progress.value = false;
}

function togleClassname($event){  
  //toggle reactive ref - toggleValue.value = !toggleValue.value;
 $event.currentTarget.classList.toggle("open");
 $event.currentTarget.nextElementSibling.classList.toggle("openthis");
}

//COMPUTED
const computedMenuTotalMenus = computed(() => alltitlesFromApi.value.length )

const computedMenuNumber = computed(  
    function compMenuNumb(){
      return giveNumber();
    }
  )
const computeFetchedIdTitles = computed(function(){
    return foodStore.getFoodMenuAllTitles;
})

const computeTitles = computed(function(){
  return foodStore.getFoodMenuTitle;
})

const showInstructions = computed(function(){
  //showInstructions..number:",menuNumberRef.value, allMenuDetailsFromApi.value
  for (let i in foodStore.getAllFoodMenuValues) {
   return foodStore.getAllFoodMenuValues[menuNumberRef.value].strInstructions
  }
})

const showMenuId = computed(function(){
  for (let i in foodStore.getAllFoodMenuValues) {
   return foodStore.getAllFoodMenuValues[menuNumberRef.value].idMeal
  }
})

const showMenuIngredients = computed(function(){
  for (const [key, value] of Object.entries(foodStore.getAllFoodMenuValues)) {
  //filter in object for sertain key names
  let arrayingredientValueKeys = Object.fromEntries(Object.entries(foodStore.getAllFoodMenuValues[menuNumberRef.value]).filter(([key]) => key.includes('strIngredient')));
  //return the values from those keynames
  let arrayingredientValues = Object.values(arrayingredientValueKeys);  
  //remove all empty values from array
  return arrayingredientValues.filter(Boolean);
    }
})

const checkToggleStatus = computed(function(){
  return toggleValue.value;
})

//WATCHERS
watch(countdown, (choose, prevCount) => {
  if ( countdown.value == 0){
       //watch - triggered clearInterval", countdown.value
        clearInterval(intervalID.value );
        reset();   
    }
})

watch(menuNumberRef, (n) => {
  //watch number
  //replaces text:
  gsap.to(".highlight", {duration: 1, text: alltitlesFromApi.value[menuNumberRef.value], delay: 1});
})

onMounted(() => {
  CTAbutton.value.className = 'true'
  CTAbutton.value.enabled= 'true'
})  
</script>

<template>
    <header>
    <h6>Totaal aantal menus: 
        <span class="number">
        {{ alltitlesFromApi.length }}
      </span>
    </h6>
      <h1>{{ msg }}
        <div id="highlight">menu {{ menuNumberRef }}:  <span class="highlight">{{ computeFetchedIdTitles[menuNumberRef] }}</span></div>
      </h1>
    </header>
  <section class="content">
    <Transition name="fadeTrans"> 
        <span  v-if="!progress" class="questionmark">?</span>
    </Transition>
  </section>
  <section>
    <button ref="CTAbutton" type="button" enabled class="CTA" @click="start()">Wat koken we vandaag? </button>
  </section>
  <section class="menuDetails">
    <h4 v-if="showMenuId">Menu: {{ showMenuId }}</h4>
    <h4 v-else> Menu: <i>no id found</i></h4>
    <h3>Instructions</h3>
    <div v-if="showInstructions">
      <p>
        {{ showInstructions}}
      </p>
    </div>
    <div v-else>
      no instructions found
    </div>
  <div v-if="showMenuIngredients">
    <a @click="togleClassname($event)" class="accord" >
    <h3>Ingredienten ({{showMenuIngredients.length}})</h3>     
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
    no Ingredients found
  </div>
  <a @click="togleClassname($event)" class="accord" >
    <h3>All menus </h3>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e5e5e5" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <title>plus circle</title>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  </a>
    <div v-if="allMenuDetailsFromApi" class="toggleBox" ref="refTarget">
        <ul class="allMenus" v-for="(food, index) in allMenuDetailsFromApi">
          <li>index:{{ index }} - ID: {{ food.idMeal }}</li> 
          <li>Title:{{ food.strMeal }}</li> 
        </ul>
    </div>
    <div v-else>
      no data found
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
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  li{
    list-style: none;
  }
}



button {
  width: 300px;
  padding: 1rem;
  margin: 0 auto;
  align-self: end;
  border: solid 1px #35eb9a;
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
  width: 9rem;
  height: 9rem;
  position: relative;
  display: block;
  border-radius: 100%;
  border: solid 8px #155f3e;
  padding:0px;
  margin: 0px;
  line-height: 1em;
}
.number {
  border-radius: 100%;
  border: solid 2px #f1f1f1;
  background-color: #242424;
  padding:0.5rem;
  margin: 0px;
    line-height: 1em;
    margin-left: 1rem;
    min-height: 1rem;
    min-width: 1rem;
    display: flex;
    text-align: center;
    align-items: center;
}
</style>

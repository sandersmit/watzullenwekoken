<script setup lang="ts">
import { computed,ref, reactive,defineExpose, watch, onMounted, } from "vue";
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
//Props are Reactive
const props =  defineProps({
    msg: {
        type: String,
        default: "Edit Detailpage",
    },
    menuFilterValProp:{
        type: Object,
    },
    usedOnPage:{
      type: String,
      default:"lab"
    }

});

const foodStore = useFoodStore();
const { getFoodMenuFiltered, reactiveOrderMenus, alltitlesFromApi, allMenuDetailsFromApi, allFilteredTitles } = storeToRefs(useFoodStore()); 

//To replace the data(){}
const CTAbutton = ref(null)
//const refTarget = ref(null)
const progress = ref(false)
const toggleValue = ref(false);
const menuNumberRef = ref(0);
const totalApiMenuTitles = ref([]);
const intervalReducer = 0.5;
let intervalNumber = ref(500) // 1sec
const countdown = ref(5)
const intervalID = ref(0)

// const reactiveMenuState = reactive({
//   menuname: props.menuFilterValProp,
//   status: props.menuFilterValProp, 
//   id: props.menuFilterValProp
// })
  
//METHODS
function getRandomInt(max:number) {
  return menuNumberRef.value = Math.floor(Math.random() * max);
}

function giveNumber(){
  countdown.value--;
  //new interval number", intervalNumber.value) // 0 
  return getRandomInt(allFilteredTitles.value.length);
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

const swapMenuTitles = (newTitles) => newTitles.forEach(element => {
  //alltitlesFromApi.value.length = 0;
  console.log('swapmenu titles',element)
  allFilteredTitles.value.push(element)
});

const defineExposeMethod2 = () => console.log('defineExpose2');

//DEFINE_EXPOSE
defineExpose({
        defineExposeMethod2
       })

//COMPUTED
//const computedMenuTotalMenus = computed(() => alltitlesFromApi.value.length )


// const computedMenuNumber = computed(  
//     function compMenuNumb(){
//       return giveNumber();
//     }
//   )

// const computeReactiveOrderMenu = computed(function(){
//   return  reactiveMenuStatus.id.param2 ? foodStore.reactiveOrderMenus : foodStore.getFoodMenuAllTitles;
//   return foodStore.reactiveOrderMenus; 
// })


const computeMenuFilter = computed(function(){
  //if checkbox prop is true
  if(props.menuFilterValProp.param2){
    return foodStore.getFoodMenuFiltered(props.menuFilterValProp.param3);
    // foodStore.allFilteredTitles;
  }else{
   return foodStore.getFoodMenuFilteredRemoved(props.menuFilterValProp.param3);
  //  return foodStore.allFilteredTitles;
  }
})

//const computeOrderMenu= computed(function(){
  // if(props.menuFilterValProp.param2 && props.menuFilterValProp.param3==0){
  //   foodStore.getFoodMenuFiltered(props.menuFilterValProp.param3);
  //   return foodStore.reactiveOrderMenus;
  // }else{
  //  return foodStore.getFoodMenuFilteredRemoved(props.menuFilterValProp.param3);
  //  // return [];
  // }
//})
// const computeQuickMenu= computed(function(){
//   if(props.menuFilterValProp.param2 && props.menuFilterValProp.param3==1){
//     foodStore.getFoodMenuFiltered(props.menuFilterValProp.param3);
//       return foodStore.reactiveQuickMenus;
//     }else{
//   return foodStore.getFoodMenuFilteredRemoved(props.menuFilterValProp.param3);
//     //  return [];
//     }
// })
// const computeApiMenu= computed(function(){
//   if(props.menuFilterValProp.param2 && props.menuFilterValProp.param3==2){
//     foodStore.getFoodMenuFiltered(props.menuFilterValProp.param3);
//     return foodStore.getFoodMenuAllTitles;
//   }else{
//    return foodStore.getFoodMenuFilteredRemoved(props.menuFilterValProp.param3);
//    // return [];
//     }
// })



const showInstructions = computed(function(){
  //showInstructions..number:",menuNumberRef.value, allMenuDetailsFromApi.value
 //NOT VALID ACCORING ESLINT..
  for (let _i in foodStore.getAllFoodMenuValues) {
   return foodStore.getAllFoodMenuValues[menuNumberRef.value].strInstructions
  }
  //WELL VALID ACCORING ESLINT..
  // if (foodStore.getAllFoodMenuValues > 0) {
  //   return foodStore.getAllFoodMenuValues[menuNumberRef.value].strInstructions
  // } else {
  //   return foodStore.getAllFoodMenuValues[menuNumberRef.value].strInstructions
  // }
})

const showMenuId = computed(function(){
  for (let _i in foodStore.getAllFoodMenuValues) {
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

// const checkToggleStatus = computed(function(){
//   return toggleValue.value;
// })

//WATCHERS
watch(countdown, (_choose, _prevCount) => {
  if ( countdown.value == 0){
       //watch - triggered clearInterval", countdown.value
        clearInterval(intervalID.value );
        reset();   
    }
})

watch(menuNumberRef, (_n) => {
  //watch number
  //replaces text:
  gsap.to(".highlight", {duration: 1, text: allFilteredTitles.value[menuNumberRef.value], delay: 1});
})

onMounted(() => {
  CTAbutton.value.className = 'true'
  CTAbutton.value.enabled= 'true'
})  
</script>

<template>
  <header v-if="props.usedOnPage=='lab'">
    <div>
      computeMenuFilter?
    {{ computeMenuFilter }}
    <hr>
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
  <section class="content">
    <Transition name="fadeTrans"> 
      <div v-if="!progress" class="qmarkcontainer">
        <span class="questionmark my-md-4">
          ?
        </span>
      </div>
    </Transition>
  </section>
  <section class="my-4">
    <button ref="CTAbutton" type="button" enabled class="CTA my-md-2" @click="start()">Wat koken we vandaag? </button>
  </section>
  <header>    
    <h6>Totaal aantal menus?: 
        <!-- <span class="number">
        {{ alltitlesFromApi.length }}
      </span> -->
      <span class="number">
        {{ computeMenuFilter.length }}
      </span>
    </h6>
    <div class="headermain">
      <h1 v-if="computeMenuFilter.length > 0">
        <!-- {{ props.msg }} -->
        <!-- {{ props.msg }}{{props.menuFilterVal}} -->
        <div  id="highlight">menu {{ menuNumberRef }}:  <span class="highlight">{{ computeMenuFilter[menuNumberRef] }}</span></div>
      </h1>
      <h1 v-else>
        <div id="highlight">Selecteer een <span class="highlight">kook type</span></div>
      </h1>
    </div>
    </header>
  
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
    <a @click="togleClassname($event)" class="accord py-md-2" >
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
  <a @click="togleClassname($event)" class="accord py-md-2" >
    <h3>All menus </h3>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e5e5e5" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <title>plus circle</title>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  </a>
    <div v-if="allMenuDetailsFromApi" class="toggleBox" ref="refTarget">
        <ul class="allMenus">
          <li v-for="(food, index) in allFilteredTitles" :key="index" >Menu:{{ index }}
            {{ food}}</li> 
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
  border: solid 2px #35eb9a;
  font-family: monospace;
  margin-bottom:2rem;
  &:hover{
    background-color: #242424;
  }
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

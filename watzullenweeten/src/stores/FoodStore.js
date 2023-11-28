import { defineStore } from "pinia";

//as the name of the file 'FoodStore.js'
export const useFoodStore = defineStore('FoodStore', {


  //The state is defined as a function returning the initial state
    state: function () {
        return {
          currentFood:"only the best",
          //optional data
          reactiveOrderMenus: [
          "Doner",
          "Pejo",
          "Pizza",
          "Kibbeling",
          "Moeders Sate",
          "Chinees",
          "Spareribs",
          "Sushi",
          "Rotti",
          "Hamburger menu"],
          
          //optional data
          reactiveQuickMenus: ["poelier",
          "verse maaltijd deka",
          "verse slager maaltijd",
          "Soep met brood&smeersels & salade",
          "Visboer gerecht",
          "Pannenkoeken & poffertjes",
          "Broodje hamburger",
          "Hotdogs",
          "Frituren",
          "Chickenwings"],

          //reactiveDataSet
          reactiveFoodCategorie:[],
          reactiveFoodMenuDetails:[],
          titlesFoodMenu:[],
          reactiveOrderMenus:[],
          reactiveAllMenuDetails:[],
          allMenuDetailsFromApi:[],
          alltitlesFromApi:[],
          categoriesFood:[],
          allFoodMenuData:[],
          reactiveFoodCategorieAllId:[],
          reactiveFoodAllIdsState:[]
        };
      },
      //Getters are synchronous functions used to retrieve data from the state
    getters: {
      getFoodMenuTitle:function(state){
        for(var key in this.reactiveFoodMenuDetails.meals) {    
           //push to beginning of array
           state.titlesFoodMenu.unshift(this.reactiveFoodMenuDetails.meals[key].strMeal)
         }
         return state.titlesFoodMenu;
      },
      getFoodMenuAllTitles:function(state){
        for(var key in this.reactiveAllMenuDetails.meals) {
           //push to beginning of array
           state.alltitlesFromApi.push(this.reactiveAllMenuDetails.meals[key].strMeal)
         }
         return state.alltitlesFromApi;
      },
      getFoodMenuValue:function(state){
        return state.reactiveFoodMenuDetails;
      },
      getAllFoodMenuValues:function(state){
        for(var key in this.reactiveAllMenuDetails.meals) {
          //push to beginning of array
          state.allMenuDetailsFromApi.push(this.reactiveAllMenuDetails.meals[key])
        }
        return state.allMenuDetailsFromApi;
      },
      getCategorieFoodMenu:function(state){
        for(var key in this.reactiveFoodCategorie.categories) {
          //pushing only the first categorie
          state.categoriesFood.push(this.reactiveFoodCategorie.categories[key].strCategory)     
        }
        return state.categoriesFood; 
      },
      getAllIds:function(state){
        //getAllIds..
        for(var key in this.reactiveFoodCategorieAllId.meals) {
          state.reactiveFoodAllIdsState.push(this.reactiveFoodCategorieAllId.meals[key].idMeal)
           }
       return state.reactiveFoodAllIdsState; 
      },
    },
    //Actions are functions that can also be asynchronous which are used to update the state
    actions:{
      async fetchFoodCategorie(){
        //fetching fetchFoodCategorie
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`
          ).then(function (response) {
            return response.json();            
          }).catch(error => {
            //request failed
            console.log("error",error)
          });
            this.reactiveFoodCategorie = response;
             return response;
       },
        async fetchCategorieIds(foodcatArg){
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodcatArg}`
            ).then(function (response) {
              return response.json();            
            });
           this.reactiveFoodCategorieAllId = response;
           return response;
        },
        async fetchRandomFoodId(randomArg){
          //fetching fetchRandomFoodId..", with randomArg
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomArg}`
            ).then(function (response) {
              return response.json();            
            });
          this.reactiveFoodMenuDetails = response;
        },
        async fetchFoodId(idArg){
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idArg}`
            ).then(function (response) {
            //   console.log(response);
              return response.json();            
            });
          this.reactiveAllMenuDetails = response;
        }
    }
  })
 
 
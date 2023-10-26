import { defineStore } from "pinia";

//as the name of the file 'FoodStore.js'


export const useFoodStore = defineStore('FoodStore', {


  //The state is defined as a function returning the initial state
    state: function () {
        return {
          currentFood:"only the best",
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
          reactiveQuickMenus: ["poelier",
          "verse maaltijd deka",
          "verse slager maaltijd",
          "Soep met brood&smeersels",
          "Visboer gerecht",
          "Pannenkoeken & poffertjes",
          "Broodje hamburger",
          "Hotdogs",
          "Frituren",
          "Chickenwings"],
          //reactiveDataSet
          reactiveFoodCategorie:[],
          reactiveFoodMenuDetails:[],
          titleFoodMenu:[],
          categoriesFood:[],
          allFoodMenuData:[],
          reactiveFoodCategorieAllId:[],
          reactiveFoodAllIdsState:[]
        };
      },
      //Getters are synchronous functions used to retrieve data from the state
    getters: {
      getFoodMenuTitle:function(state){
        //this.reactiveFoodMenuDetails.meals = 0;
        for(var key in this.reactiveFoodMenuDetails.meals) {
           console.log("key first loop",key)
           console.log(this.reactiveFoodMenuDetails.meals[key].strMeal)
           //push to beginning of array
           state.titleFoodMenu.unshift(this.reactiveFoodMenuDetails.meals[key].strMeal)
            for (var key1 in this.reactiveFoodMenuDetails.meals[key1]) {
                // console.log(this.reactiveFoodMenuDetails.meals[key][key1].strMeal)
                // state.titleFoodMenu.push(this.reactiveFoodMenuDetails.meals[key][key1].strMeal)
            }
         }
         return state.titleFoodMenu;
      },
      getFoodMenuValue:function(state){
        return state.reactiveFoodMenuDetails;
      },
      getCategorieFoodMenu:function(state){
        console.log("getCategorieFoodMenu..", this.reactiveFoodCategorie.length)
        for(var key in this.reactiveFoodCategorie.categories) {
          //console.log(this.reactiveFoodCategorie.categories[key].strCategory)
          //pushing only the first categorie
          state.categoriesFood.push(this.reactiveFoodCategorie.categories[key].strCategory)     
        }
        //console.log("state.categoriesFood", state.categoriesFood)
        return state.categoriesFood; 
      },
      getAllIds:function(state){
        console.log("getAllIds..")
        for(var key in this.reactiveFoodCategorieAllId.meals) {
          //console.log(this.reactiveFoodCategorieAllId.meals[key].idMeal)
          state.reactiveFoodAllIdsState.push(this.reactiveFoodCategorieAllId.meals[key].idMeal)
           }
          // console.log("state.reactiveFoodAllIds", state.reactiveFoodAllIdsState)
       return state.reactiveFoodAllIdsState; 
      },
    },
    //Actions are functions that can also be asynchronous which are used to update the state
    actions:{
      async fetchFoodCategorie(){
        console.log("fetching fetchFoodCategorie")
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`
          ).then(function (response) {
            console.log(response);
            return response.json();            
          }).catch(error => {
            //request failed
            console.log("error",error)
          });
            this.reactiveFoodCategorie = response;
             return response;
          //  console.log("this.reactiveFoodCategorie",this.reactiveFoodCategorie )
       },
        async fetchCategorieIds(foodcatArg){
          // const firstresponse = await this.fetchFoodCategorie();
          // console.log("firstresponse",firstresponse);
          // this.tableData = response;
          console.log("fetching fetchFoodCategorieIds")
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodcatArg}`
            ).then(function (response) {
              console.log(response); 
              return response.json();            
            });
           this.reactiveFoodCategorieAllId = response;
           return response;
        },
        async fetchFoodId(randomArg){
          console.log("fetching fetchFoodId..", randomArg)
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomArg}`
            ).then(function (response) {
               console.log(response);
              return response.json();            
            });
          this.reactiveFoodMenuDetails = response;
         // console.log(this.reactiveFoodMenuDetails)
        }

    }
  })
 
 
import { defineStore } from "pinia";

//as the name of the file 'FoodStore.js'


export const useFoodStore = defineStore('FoodStore', {


  //The state is defined as a function returning the initial state
    state: function () {
        return {
          currentFood:"mister food",
          //reactiveDataSet
          reactiveFoodCategorie:[],
          reactiveFoodMenuDetails:[],
          titleFoodMenu:[],
          categoriesFood:[],
          allFoodMenuData:[],
          reactiveFoodCategorieAllId:[],
          reactiveFoodAllIds:[]
        };
      },
      //Getters are synchronous functions used to retrieve data from the state
    getters: {
      getFoodMenuTitle:function(state){
        // console.log(this.reactiveFoodMenuDetails)
        //console.log(state.reactiveFoodMenuDetails.meals)
        
        // for (let k = 0; k < this.reactiveFoodMenuDetails.meals.length; k++) {
        //   console.log(this.reactiveFoodMenuDetails.meals[k].strCategory)
        //   state.titleFoodMenu.push(this.reactiveFoodMenuDetails.meals[k].strMeal)
        //    }
        //    console.log("titleFoodMenu",  this.titleFoodMenu)
        //    return this.titleFoodMenu
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
       // console.log("getCategorieFoodMenu",this.reactiveFoodCategorie.categories)
        // for (let k = 0; k < this.reactiveFoodCategorie.categories.length; k++) {
        //   console.log(this.reactiveFoodCategorie.categories[k].strCategory)
        //   state.categoriesFood.push(this.reactiveFoodCategorie.categories[k].strCategory)
        //    }
        
        //pushing only the first categorie
           state.categoriesFood.push(this.reactiveFoodCategorie.categories[0].strCategory)
           return state.categoriesFood; 
      },
      getAllIds:function(state){
        console.log("this.reactiveFoodCategorieAllId",this.reactiveFoodCategorieAllId)
        for (let k = 0; k < this.reactiveFoodCategorieAllId.meals.length; k++) {
          console.log(this.reactiveFoodCategorieAllId.meals[k].idMeal)
          state.reactiveFoodAllIds.push(this.reactiveFoodCategorieAllId.meals[k].idMeal)
           }
       return state.reactiveFoodAllIds; 
      },
    },
    //Actions are functions that can also be asynchronous which are used to update the state
    actions:{
        async fetchFoodId(randomArg){
          console.log("fetching fetchFoodId..", randomArg)
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomArg}`
            ).then(function (response) {
               console.log(response);
                return response.json();            
            });
          this.reactiveFoodMenuDetails = response;
          console.log(this.reactiveFoodMenuDetails)
        },
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
          
        },
        async fetchCategorieIds(arg){
          console.log("fetching fetchFoodCategorieIds")
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${arg}`
            ).then(function (response) {
               return response.json();            
            });
           this.reactiveFoodCategorieAllId = response;
        }

    }
  })
 
 
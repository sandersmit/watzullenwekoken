import { defineStore } from "pinia";

//as the name of the file 'FoodStore.js'
export const useFoodStore = defineStore('FoodStore', {


  //The state is defined as a function returning the initial state
    state: function () {
        return {
          //optional data
          reactiveOrderMenus: [
          "Doner",
          "Pejo",
          "Pizza",
          "Kibbeling",
          "spareribsExspress Sate & verse patat frituren",
          "Chinees",
          "Spareribs",
          "Sushi",
          "Rotti",
          "Hamburger menu Huesmolen",
           ],
          
          //optional data
          reactiveQuickMenus: [
          "poelier",
          "verse maaltijd deka",
          "verse slager maaltijd",
          "Soep met brood&smeersels & salade",
          "Visboer gerecht",
          "Pannenkoeken & poffertjes",
          "Broodje hamburger",
          "Hotdogs",
          "Frituren",
          "Chickenwings",
          "Taco's"],
          
          //reactiveDataSet
          allFilteredTitles:[],
          alltitlesFromApi:[],
          reactiveFoodCategorie:[],
          reactiveFoodMenuDetails:[],
          titlesFoodMenu:[],
          reactiveAllMenuDetails:[],
          allMenuDetailsFromApi:[],
          categoriesFood:[],
          allFoodMenuData:[],
          reactiveFoodCategorieAllId:[],
          reactiveFoodAllIdsState:[]
        };
      },
      //Getters are synchronous functions used to retrieve data from the state
    getters: {
      // getUserById: (state) => {
      //   //return (userId) => state.users.find((user) => user.id === userId)
      // },
      getFoodMenuFiltered:function(state){
       const allTitlesGet = [state.reactiveOrderMenus,state.reactiveQuickMenus, state.alltitlesFromApi];
           return (typeMenu) => {
            console.log("concat menu",typeMenu, allTitlesGet[typeMenu])
               //state.allFilteredTitles.concat(allTitlesGet[typeMenu])
               allTitlesGet[typeMenu].forEach(element => {
                state.allFilteredTitles.push(element); 
               }); 
               return this.allFilteredTitles;
            }
      },
       getFoodMenuFilteredRemoved:function(state){
        const allTitlesRemove = [state.reactiveOrderMenus,state.reactiveQuickMenus, state.alltitlesFromApi];
        return (typeMenu) => {
          console.log("remove Menu",typeMenu)
          //heeft typeMenu een waarde ? (geen NULL) : anders geef 0
            if(typeMenu == 0 || typeMenu == 1 || typeMenu == 2 ){
            
              allTitlesRemove[typeMenu].forEach(eachitem => {
               console.log("eachitem",eachitem)
              state.allFilteredTitles.filter((deleteItem, index)=>{
                            if(deleteItem ==  eachitem){
                            let findindex = allTitlesRemove[typeMenu].indexOf(deleteItem);
                              console.log("delete!:",eachitem,deleteItem,findindex, index); 
                            state.allFilteredTitles.splice(index, 1);
                          }
                          //To remove the duplicates, you use the filter() method to include only 
                          //elements whose indexes match their indexOf values:
                          //return removedItem
                          }) 
                        })
                        return this.allFilteredTitles;
                
              }else{
                console.log("null?",typeMenu)
              return state.allFilteredTitles
            }
          }
       },
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
 
 
<template>
    <div class="form-check">
        <label :for="`${checkIdProp}`" class="form-check-label extraclassname">{{checkboxNameProp}}</label>
        <input type="checkbox" class="form-check-input"
        :id="`${checkIdProp}`"
        :class="checkIdProp==0 ?'active':''" 
        :value="`${checkboxValueProp}`" 
        :shownumber="`${showNumberBoolProp}`"
        @click="checkboxValuePropEmit"
        ref="checkboxEl"
        >
       
        <span v-if="computeTotalIndicators[checkIdProp]&&showNumberBoolProp">{{ computeTotalIndicators[checkIdProp].length }}</span> 
        <span v-else-if="!showNumberBoolProp"></span>
        <span v-else-if="!computeTotalIndicators[checkIdProp]">0</span>               

    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useFoodStore } from '../../stores/FoodStore'

export default{
    //using composition api with setup() as am option from the option API
    //end using composition api with setup()
    setup() {
        const foodStore = useFoodStore();
        const amounts = ref([])

    // expose to template and other options API hooks
    return {
        foodStore,
        amounts
    }
  },
    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: {
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to check if the prop is required
            checkIdProp:{
                type:Number,
                required: true
            },
            checkboxNameProp:{
                type:String,
                required: true
            },
            checkboxValueProp: {
                type:String,
                required: true
            },
            showNumberBoolProp: {
                type:Boolean,
                required: true
            }
    },
    data() {
        return {
            detailsAreVisible: false,
            selected: false
        }
    },
     //to comunicate for developers on howmany or wich emit events there are. 
     emits:[
    'emit-checkbox-value',
    // 'delete-event-emit'
    ],
    methods: {
        // togleDetails:function(){  
        //     this.detailsAreVisible = !this.detailsAreVisible;
        //     console.log(`toggle ${this.bedrijfsnaamProp} test6 ${this.bedrijfsUrlArgumentProp}`);
        // },
        setCheckbox(){
           //if(this.checkIdProp==0){
            this.$refs.checkboxEl.checked;
          // }
        },
        checkboxValuePropEmit:function(){  
           // console.log(this.checkboxEl)
           //this.setCheckbox();
            //LET OP!
            //emitting custom event 'emit-custom-event' => to parent comp
            // passing 'custom event name' + argument
            this.selected =! this.selected;
           const emitCheckboxProps = {
             'thisSelected':this.selected,
             'thisCheckboxName': this.checkboxNameProp,
             'thisId':this.checkIdProp
           }
            if(this.selected){
                this.$emit('emit-checkbox-value', emitCheckboxProps)
            }else{
                this.$emit('emit-checkbox-value', emitCheckboxProps)
            }
           
        },
        addEventWai:function(){  
          const filterCheckBox = document.querySelectorAll(".form-check-input");
          for (let index = 0; index < filterCheckBox.length; index++) {
              filterCheckBox[index].addEventListener("keydown", (event) => {
                if (event.keyCode === 13) {
                  event.target.click();
                }
            });
          }
        }
    },
       //YOU only want to change one value when one dependency changes.NOT all..
        //Not change all because of one change in one of the existing data depandancy..
        // so only to check and return or display allready-known & 
        // -calculated values (from methods:) to the user-interface
    computed:{
            computeTotalIndicators() {  
                return this.foodStore.allTitlesGet
            },
            computedClass() {
                const valueclassname = paginationIndexProp=0 ? 'active':''
                //let className = 'active';
                // More complicated logic to determine what
                // class should be applied
                return valueclassname;
                },
            // returnChecked() {
            //     return this.selected
            // }   
    },
    //YOU repeat the names from //data properies  //for example 'counter'
    // - in the 'watch:' object - as functions() - to watch changes between them. 
    watch:{
        
    },
    //lifecyclehooks voor fetchen API data. 
    beforeCreate() { 
       
    },
    mounted(){
        this.setCheckbox()
        this.addEventWai()
    },
    created() {
       
    }
}
</script>

<!-- <style scoped lang="scss">
</style> -->


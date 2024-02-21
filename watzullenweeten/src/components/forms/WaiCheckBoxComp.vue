<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";


const checkBool = ref(false)

const emit = defineEmits(['emit-checkbox-value'])

const props =  defineProps({
    checkIdProp: {
        type:Number,
        required: true
    },
    checkboxValueProp: {
        type:String,
        required: true
    },
    checkboxNameProp: {
        type:String,
        required: true
    }
});

//METHODS
function toggleCheckEmit(){
    checkBool.value = !checkBool.value; 
    const emitObj = {
        chkbool : checkBool.value,
        chkname : props.checkboxNameProp
    }
  emit('emit-checkbox-value', emitObj);
}

</script>

<template>
    <div class="form-check check">
        <span v-if="checkBool" class="label">{{props.checkboxNameProp}} on</span>
        <span v-else class="label">{{props.checkboxNameProp}} off</span>
        <!-- <img alt="iconAltName" :src="path"> -->
        <label :for="`${checkIdProp}`" class="switch mx-2" tabindex="0">    
             <input  @click="toggleCheckEmit"  :id="`${props.checkIdProp}`" type="checkbox" :aria-describedby="`toggle ${props.checkboxValueProp} ${checkBool}`">
             <span class="slider"></span>
        </label>
    </div>
</template>

<style scoped lang="scss">

   
</style>


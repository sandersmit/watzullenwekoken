import { test, expect } from "vitest";


test('1+1',()=>{
    expect(1+1).toEqual(2)
})

test('3+3',()=>{
    expect(3+3).toEqual(6)
})

 const nums = [16,10]
 const oneNumber = [6]

//... Rest Parameters - taks the last remaining parameters. it is alsways being used as last parameter. 
function sum(...arg){
    // .reduce itterates over all array items and returns one value.  
    return nums.reduce(calculationFunction)
}

function calculationFunction(a, b){
    return a+b;
}

// test('sum function with restparams & reduce',()=>{
//     expect(sum(nums)).toEqual(21)
// })

test('sum function with oneNumber',()=>{
    expect(sum(oneNumber)).toEqual(12)
})
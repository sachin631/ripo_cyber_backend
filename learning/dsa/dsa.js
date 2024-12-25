//>>>>>>>>>>#3 insert an elemnt in array at a given index in an array>>>>>>>>>
// let position = 1;
// let arr = [0, 1, 2, 3, 4, 5];
// for (let i = arr.length - 1; i >= position; i--) {
//   arr[i + 1] = arr[i];
// }
// arr[position] = "newValue"; // Insert the new value at the desired position

// console.log(arr);

//>>>>>>>>#3 insert an elemnt in array at a given index in an array using splice method>>>>>>>>>>
// let pos = 1;
// let arr1 = [0, 1, 2, 3, 4];

// arr1.splice(1,0,"newValue");
// console.log(arr1,"arr1");

//>>>>>>>>>>>>#4 delete element =  an array =  given position>>>>>>>>>>>>>>>>
// let arr=[0,1,2,3,4] ;
// position=2 ;
// for(let i=position;i<arr.length-1;i++){
//     console.log(arr[i])
//     arr[i]=arr[i+1];
// }
// console.log("a")
// arr.length=arr.length-1 //remove first element =  the array
// console.log(arr);

//>>>>>>>>>>#5 check the elem is present in the array or not>>>>>>>
// let arr=[12,234,45,67];
// let elem=12;
// for(let i=0;i<arr.length;i++){
//     console.log(i)
//     if(arr[i]==elem){
//         console.log(`elem is at index ${i}` );
//         break;
//     }
// }

//#5 >>>>>>>>>>>>>>by using js method >>>>>>>>>>>
// let arr = [123, 345, 56, 34, 56, 78, 2];
// console.log(arr.indexOf(345));

// #6 **************** merge two array *************************************

// let arr1=[1,2,3,4,5];
// let arr2=[6,7,8,9,10,11,12];
// let merged_array=[...arr1,...arr2] //first method
// console.log(merged_array,"merged array") ;

// let new_array=[] ;
// for(let i=0;i<arr1.length;i++){
//     new_array.push(arr1[i]);     //second method
// }
// for(let i=0;i<arr2.length;i++){
//     new_array.push(arr2[i]);
// }
// console.log(new_array,"new_array") ;

//next method
// let arr1=[1,2,3,4];
// let arr2=[5,6,7] ;
// let merged_array=[]
// for(let i=0;i<arr1.length;i++){
//     merged_array[i]=arr1[i];
// }

// for(let i=0;i<arr2.length;i++){
//     merged_array[merged_array.length]=arr2[i]
// }
// console.log(merged_array,merged_array.length)

//#>>>>>>>>>>>>>>>>>>>>>>>>>>>> #7 merge two array using while loop >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// let data1=[12,23,1,2,4,22];
// let data2 =[34,56,78] ;
// let data3=[];
// let d1=0;
// let d2=0;
// let d3=0;

// while(d1<data1.length && d2<data2.length){
//     console.log(d2);
//     // console.log(d2);
//     // console.log(d3);
//     if(data1[d1]<data2[d2]){
//         data3[d3]=data1[d1];
//         d1++
//     }else{
//         data3[d3]=data2[d2];
//         d2++
//     }
//     d3++;

// }
// while(d2<data2.length){
//     data3[d3]=data2[d2];
//     d3++;
//     d2++;
// }
// console.log(data3) ;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>># 10 sorting using bubble sort >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const arr = [4, 3, 2, 1, 0, 0];
// let arr2 = [];

// for (let i = 0; i < arr.length; i++) {
//   //4
//   for (let j = i + 1; j < arr.length; j++) {
//     //4
//     console.log('arr i: ', arr[i], 'arr j :', arr[j]);
//     if (arr[i] > arr[j]) {
//       let c = arr[i];
//       arr[i] = arr[j];
//       arr[j] = c;
//     }
//   }
// }
// console.log(arr);

// function fn(data){
//     console.log('fn') ;
//     let a =1;
//     a=data*data-1
//     if(data<=1){
//         fn(data--)
//     }
//     console.log(a);
// }

// fn(5)

//#11 find factorial of the number without using any loop (using recursion)

// let num=5;
// let data=num;
// function fact(num){
//     if(num>1){
        
//         data=data*(num-1); //5*4=20*3=60*2=120
//         num-- ;//2
//         fact(num);
//     }
// }
// fact(num);
// console.log(data);


//second method 
// let data=1;
// function fact(num){
//     if(num==0){
//         return 1;
//     }
//     return num*fact(num-1);

// }
// console.log(fact(5));
// fn

// *************************************//question's not solve yet **************************************************************

function data (x){
    if(x>0){
       data(x-1);
    }
    console.log('Data', x);
}
data(5);
//***************************************** wap by using indirect recrussion to by apple if you have money ******************************************************************************* /

let price = 100;
let count = 0
function apple(x) {
    if (x > 0) {
         count=count+1;
        console.log('apple no.', count);
        money(x - 10)
    }
}
function money(money) {
    apple(money);
}

money(price);

// *********************************************************************************************************************************************************




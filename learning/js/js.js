//#1 split method split the string on behalf on particular  delimeter
// let a='sachin,sangwan';
// console.log(a.split(','));

//#2 join method is used to merge all elements of an array into a single string.
// let b=['sachin','sangwan'];
// console.log(b.join(''))

// #3 freeze method is used to make the object immutable.
// let c = { 
//     name: 'John',
//     age: 30,
//     data:{
//         address:'New York',
//         city:'Manhattan',
//         zipcode:'10001'
//     }
//  };
//  console.log(typeof c.data.address)
// let feeezingLoop=async(obj)=>{
//     Object.freeze(obj);
//     Object.keys(obj).forEach((curelem)=>{
//         console.log(typeof curelem,'tyye of curele')
//         if(typeof obj[curelem]==='object'){
//             console.log(typeof curelem);
//             feeezingLoop(obj[curelem])
//         }
//     })
// }
// feeezingLoop(c);
// c.name='c.name';
// c.data.address='c.data.address';
// console.log(c,'object c is frozen');

//#4 Object.keys method returns an array of a given object's own enumerable properties, i.e., those properties whose name or symbol are not symbols in the scope chain of the object being enumerated.
// let d = {
//     name: 'John',
//     age: 30,
//     data:{
//         address:'New York',
//         city:'Manhattan',
//         zipcode:'10001'
//     }
//  };
// console.log(Object.keys(d)),'object keys of d'

// #5 promise.all method is used to wait for all promises passed as an argument to the function to be executed when all promises are resolved, i.e., they have been fulfilled with a value or rejected with a reason.

//#6 findIndex
// let a=[1,2,3,4];
// console.log(a.findIndex((curelem)=>curelem>1)) //return -1 if no cond is filled else return first match elem index

// #7 Array.= ()
// let a='sachin';
// let b=Array.= (a)
// console.log(b);//[ 's', 'a', 'c', 'h', 'i', 'n' ]

//#7 set method of js is used to create a new Set object with the specified elements as arguments. //only keep unique elem in set
// let data= new Set();
// data.add('sachin');
// data.add('sangwan');
// data.add([1,2,3]);
// data.add({a:"a",b:"b"});
// data.add('sachin');
// data.add([1,2,3]);
// data.delete('sachin');
// // data.clear()
// console.log(data.has('sangwan'));
// data.forEach((curelem)=>{
//     console.log(curelem,'s')
// });
// console.log(data.values(),'wghjk')
// console.log(data);

// let my_map=new Map();
// my_map.set("a","b");
// my_map.set('sachin','sangwan');
// // my_map.delete('sachin')
// // let get=my_map.get('sachin')
// // let has=my_map.has('sachin');
// // let clear=my_map.clear(); //all clear
// // let key=my_map.keys();
// // let values=my_map.values();
// my_map.forEach((value, key)=>{
//     console.log(key,value);
    
// });
// // console.log(All_data)




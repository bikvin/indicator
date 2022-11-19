const { v4: uuidv4 } = require('uuid');

// const prFunc = async () => {

//     let a = 'one';


//     const res = await new Promise((resolve) =>{
//         setTimeout(() =>{
//             a = 'two';
//             resolve(a);
//         }, 2000)
//     })


//     return res;

    
// }

// const medFunc = async () => {

//     res = 'haha';

//     res = await prFunc();

//     return res;

    
// }


// medFunc().then(result => {
//     console.log(result);
// })


// const promiceFunc = () => {
//     let a = 'one';

//     const res = new Promise((resolve) =>{
//         setTimeout(() =>{
//             a = 'two';
//             const obj = {1: a, 2: 'three'};
//             resolve(a, obj);
//         }, 2000)
        
//     })

  
//     return res;


// }


// console.log(promiceFunc());




// const medFunc = () => {
//     return promiceFunc();
// }

// medFunc().then(((result,obj) => {console.log(result,obj); }))


console.log(uuidv4());

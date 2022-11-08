// import { Component } from 'react';
// import React from 'react';
// import {db} from './FirebaseConfig';
// import{ref,onValue,set} from 'firebase/database';
// export class GetData extends Component{

//     componentDidMount(){
//         let references=ref(db,'mynode/');
//         // snapshot is an observable(this concept belongs to rsjx) & promises concept belong to javascript
//         onValue(references,(snapshot)=>{
//             const data=snapshot.val();
//             console.log(data);
//         });
//         let id=1;
//         references=ref(db,'products/'+id);
//         set(references,{
//             category:"Fruits",
//             //examplekey1:"examplevalue1"
//         });
//     }

//     render(){
//         return (
//         <div class="card" style="width: 18rem;">
//         <img src="..." class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">Card title</h5>
//           {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
//           <a href="#" class="btn btn-primary">Go somewhere</a>
//         </div>
//       </div>
//       );
//     }
// }
import { Component } from 'react';
// ref fives the location where you have to read and write the data
import { onValue,ref,remove } from 'firebase/database';
import {Link,Redirect} from 'react-router-dom';
//import firebase from "firebase";
import React from 'react';
import {GoogleAuthProvider,signInWithRedirect,signOut,onAuthStateChanged,getAuth} from 'firebase/auth';
import {db} from './FirebaseConfig';
const auth = getAuth();

export class Navbar extends Component{
    state={
        loginstatus:'',
        productsInCart:0
    }

// navigation bar upload hone k bad componentDidMount call hoga asynchronously in DOM tree
componentDidMount(){
    
  //The module provides a method called onAuthStateChanged which allows you to subscribe to the users current authentication state, and receive an event whenever that state changes.
    onAuthStateChanged(auth,(user)=>{
     if(user)
     this.setState({loginstatus:true})
     else
     this.setState({loginstatus:false})
 })

 let cartid=localStorage.getItem('cartid');
 if(cartid!=null){
  try{
  const refernce=ref(db,'shopping-cart/'+cartid+'/items');
  //on value ko reference pass karne pe snapshot mil raha hai
  onValue(refernce,(snapshot)=>{
    // productsInCart will get an array of object 
    let productsInCart=snapshot.val();
   
    if(productsInCart!=null)
    // Object.keys(productsInCart)=array
    this.setState({productsInCart:(Object.keys(productsInCart).length)});
    else{
      this.state.productsInCart=0;
      this.setState({productsInCart:this.state.productsInCart});
    }
  })
  }
  catch(error){

  }
 }
}
login(){
    signInWithRedirect(auth,new GoogleAuthProvider());
}
logout(){
    let cartid=localStorage.getItem('cartid');
    remove(ref(db,'shopping-cart/'+cartid));
    signOut(auth);
}


render(){
   
  return(
    
  //  make nav bar sticky by css prop
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
       <Link className="navbar-brand" to="#">yourMART</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
        </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="btn btn-warning" to="/shopping-cart">Cart
              <span className='badge bg-danger ms-1'>{this.state.productsInCart}</span>
            </Link>
          </li>

          <li className='nav-item'>
            {/* this is kind of if else */}
            {!(this.state.loginstatus)&&<a className="nav-link" onClick={this.login}>Login</a>}
          </li>

          <li className='nav-item'>
            {(this.state.loginstatus)&&<a className="nav-link" onClick={this.logout}>Logout</a>}
          </li>

        </ul>     
      </div>
    </div>
  </nav>);
}
}
import {React,Component} from 'react';
import {db} from './FirebaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import { onAuthStateChanged, signInWithRedirect, GoogleAuthProvider,getAuth } from 'firebase/auth';
const auth = getAuth();
export class ShoppingCart extends Component{

    state={
        products:{},
        sum:0
    }
// componentDidMount helps to stub the js with html
    componentDidMount(){
        let cartid=localStorage.getItem('cartid');
        console.log(cartid);
        let refrence=ref(db,'shopping-cart/'+cartid+'/items');
        console.log(refrence);
        onValue(refrence,(snapshot)=>{
            let products=snapshot.val();
            this.setState({products:products});

            console.log(this.state.products);
            // this.calculatetotal();
            // console.log(this.state.products);
        });
    }

    handleDelete=(product)=>{
        // "..." ->this is called spread operator 
        let products={...this.state.products};
        // deleting product from the arrray
        delete products[product];
        this.setState({products:products});
        let cartid=localStorage.getItem('cartid');
        //deleting product from the database...two time deletion is performed
        // remove is a method of database like set and onVlue method.remove() basically used to delete the data from the database
        remove(ref(db,'shopping-cart/'+cartid+'/items/'+product))
    }

    handleClick=()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                // logic of payment gateway
            }
            else{
                signInWithRedirect(auth,new GoogleAuthProvider())
            }
        })
    }

    render(){
        return(
            <div className='container'>
            <table class="table table-dark">
                <thread>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                    </tr>
                </thread>
                <tbody>
                    {/* map always takes two argument ,i=index(optional to use)*/}
                    {Object.keys(this.state.products).map((product,i)=>(
                      <tr>
                        <th scope="row">{i+1}</th>
                        <td>{this.state.products[product].product.title}</td>
                        <td>{this.state.products[product].product.price}</td>
                        <td>{this.state.products[product].quantity}</td>
                        <td>{this.state.products[product].quantity*this.state.products[product].product.price}</td>
                        <td><button className='btn btn-danger ps-4 pe-4' onClick={()=>{this.handleDelete(product)}}>delete</button></td>
                      </tr> ))}
                </tbody>
                
                <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><button className='btn btn-success pe-3 active' onClick={this.handleClick}>CheckOut</button></td>
                        </tr>
                </tfoot>
            </table>
            </div>
        );
    }
}


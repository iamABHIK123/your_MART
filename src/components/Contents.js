import { Component,React } from "react";
import {db} from './FirebaseConfig';
import {ref,onValue,set} from 'firebase/database';
//let x=1;
export class Contents extends Component{
    // below allProducts is initialized outside the state because,it's not dynamic in nature,i mean we wil assign the value here once here
    allProducts=[];
    state={
        categories:[],
        products:[],
        quantity:0
    };

    componentDidMount()
    {
        this.getProducts();
        this.getCategories();
    }

    handleChange=(quantity)=>{
        this.setState({quantity:quantity});
    }

    handleClick=(category)=>{
        if(category==="All Categories"){
            this.setState({products:this.allProducts})
        }
        else{
            this.state.products=this.allProducts;
            // const products is a local variable
            const products=this.state.products.filter((product)=>
                product['category']===category
            )
            this.setState({products:products});
            console.log(products);
        }
    }

    // two changes ,1 in browser(through localStorage obj) and 1 in firebase using set,ref
    addtocart(product){
        // 2000 - 3000 ka range mein e (Math.random()*99999000).toFixed(); fun unique value de dega,iske bad repeat hoga
        let productid=(Math.random()*99999000).toFixed();
        // getItem() helps to get the id of the product
        let cartid=localStorage.getItem('cartid');
        if(cartid==null){
            let cartid=(Math.random()*99999000).toFixed();

            // creating new folder shopping-cart in firebase
            const reference=ref(db,'shopping-cart/'+cartid+"/items/"+productid);
            set(reference,{
                'product':product,
                'quantity':Number(this.state.quantity)
            });
            //local storage obj helps to save data in your browser
            localStorage.setItem('cartid',cartid);
        }
        else{
            const reference=ref(db,'shopping-cart/'+cartid+"/items/"+productid);
            set(reference,{
                'product':product,
                // we are converting this quantity(string) into Number for the getting the total value
                'quantity':Number(this.state.quantity)
            });
        }
    }
    getProducts(){
      const reference = ref(db, "products");
      //When you call onValue you get the current value from that path in the database, and then also get all updates to that value. Since your callback may be called multiple times, there is no way to return a single value.
      onValue(reference, (snapshot) => {
        //A DataSnapshot contains data from a Database location. Any time you read data from the Database, you receive the data as a DataSnapshot . A DataSnapshot is passed to the event callbacks you attach with on() or once() . You can extract the contents of the snapshot as a JavaScript object by calling the val() method.
        let products = snapshot.val();
        this.setState({ products: products });
        this.allProducts = products;
        console.log(this.state.products);
      });
    }

    getCategories(){
        const reference=ref(db,'category');
        onValue(reference,(snapshot)=>{
            let categories=snapshot.val();
            this.setState({categories:categories});
            console.log(this.state.categories);
        })
    }

    render(){
        return(
            //  m-3 means mergin ko chorna
            <div className='m-3'>
                <div className='row'>


                   {/* // took 3 column for the menu bar */}
                <div className='col-3'>

                    {/* below logic is for the menu */}
                    <ul className='list-group'>
                     {/* hard-coded all categories , either all cat*/}
                        <li key={1} className='list-group-item active' onClick={()=>{this.handleClick("All Categories")}}>All Categories</li>  
                        {/* Dynamically all categories,or daily pulse nuts */}
                        {this.state.categories.map(category=>(<li onClick={()=>{this.handleClick(category['categoryname'])}} key={category['categoryname']} className='list-group-item'>{category['categoryname']}</li>))}               
                    </ul>       
                </div>
                    {/* took 9 column for the products */}

                    <div className='col-9'>
                        <div className='row'>
                            {this.state.products.map(product=>(<div className='col-4'>
                                <div key={product['title']} className="card" style={{width:'18rem'}}>
                                <img src={product['imagesUrl']} style={{width: '18rem', height: '15rem'}}className="card-img-top"/>
                               
                               <div className="card-body">
                                <h5 className="card-title">{product['title']}</h5>
                                <h5 className="card-title">₹{product['price']}</h5>
                             <div className="row">
                                 <div className="col-7">
                                    {/* here onChange event is taking an argument ;; e=event ,targer=select tag , value jho ap likh k rakhe hai*/}
                                    <select key={product['title']} className="form-select" onClick={(e)=>this.handleChange(e.target.value)}>
                                        <option value="0">QUANTITY</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                    </select>
                                  </div>
                                <div className='col-5'>
                               <button className='btn btn-primary' onClick={()=>{this.addtocart(product)}}>ADD TO CART</button>
                               </div>
                             </div>
                                </div>
                                </div>
                                </div>
                                ))}
                              
                        </div>
                    </div>
                </div >

            </div>
        );
    }
}
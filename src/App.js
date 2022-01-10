import React,{useEffect,useState} from "react";
import './App.css';
import Product from './components/Product';

function App() {
  //inital state
  const [products,setProducts]=useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [categories,setCategories] = useState(null);
  const [selectedSubscriptionName,setSelectedSubscriptionName] = useState("none");
  const [selectedSubscription,setSelectedSubscription] = useState({
    id:'none',
    name:'none',
    maxVolume:0,
    maxValue:0,
  });
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalVolume,setTotalVolume] = useState(0);
  const [productsAmount,setProductsAmount] = useState([]);

  useEffect(()=>{
    //fetch products array and setState for products
    fetch('https://mystifying-spence-dc3bda.netlify.app/build-a-box/products.json')
    .then(data=>data.json())
    .then(json=>{
      setProducts(json.products)
      setProductsAmount(json.products.map(product=>0))
      setCategories([...new Set(json.products.map(product=>JSON.stringify(product.category)))].map(category=>JSON.parse(category)))
    })

    //fetch suscriptions array and setState for subscriptions
    fetch('https://mystifying-spence-dc3bda.netlify.app/build-a-box/subscriptions.json')
    .then(data=>data.json())
    .then(json=>{
      setSubscriptions(json.subscriptions)
    })
  },[])


  return (
    <div className="App">

      {/* select subscription box */}
      <div className="subscriptions-section">
        {subscriptions?
        <select 
        value={selectedSubscriptionName} 
        onChange={(e)=>{
          //get selected subscription
          setSelectedSubscriptionName(e.target.value)
          setSelectedSubscription(subscriptions.find(i=>i.id===e.target.value) || {
            id:'none',
            name:'none',
            maxVolume:0,
            maxPoints:0,
          })
          //reset product amount and total values
          setTotalPoints(0)
          setTotalVolume(0)
          setProductsAmount(productsAmount.map(amount=>0))
        }} 
      >
        {subscriptions.map((subscription=>{
          return <option value={subscription.id}>{subscription.name}</option>
        }))}
        <option selected disabled value={'none'}>(Select A Subscription Size)</option>
      </select>:
      <div>loading subscription sizes...</div>
        }


      <div className="subscription-info-container">
        {selectedSubscription.id!=='none'?
        <div>
          <div>Subscription Size Selected: <b>{selectedSubscription.name}</b></div>
          <div>max points for this size: <b>{selectedSubscription.maxValue}</b></div>
          <div>max volume for this size: <b>{selectedSubscription.maxVolume}</b></div>
        </div>:
        <div><h3>Select A Subscription Size To Get Started!</h3></div>}
      </div>
    </div>
    {/* products */}
    <div className="total-values-container">
      <div>
      Total Points Added To Box: <b>{totalPoints}/{selectedSubscription.maxValue}</b>
      </div>
      <div>
      Total Volume Added To Box: <b>{totalVolume}/{selectedSubscription.maxVolume}</b>
      </div>
    </div>
    

      {categories?<div className="categories">
      {categories.map(category=>{
        return(
          <>
            <div>
              <b>Category: {category.name}</b>
            </div>
            <div className="products-container">
            {products?products.filter(product=>product.category.id===category.id).map((product,idx)=>{
            return(
              <div>
                <Product 
                key={product.id} 
                productIndex = {idx}
                product={product} 
                setTotalPoints={setTotalPoints} 
                setTotalVolume={setTotalVolume} 
                totalPoints = {totalPoints} 
                totalVolume={totalVolume}
                selectedSubscription={selectedSubscription}
                productsAmount = {productsAmount}
                setProductsAmount = {setProductsAmount}
                />
              </div>
            )
          }):<>loading products...</>}
          </div>
          </>
        )
      })}</div>:<div>loading...</div>}


    {/* save button */}
    <div className="save-container">
      <button className="save-button" disabled={totalPoints===0 || totalVolume===0}>
        Save
      </button>
    </div>


    </div>
  );
}

export default App;

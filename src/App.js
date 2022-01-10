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
      {subscriptions?
      <select 
      value={selectedSubscriptionName} 
      onChange={(e)=>{
        //get selected subscription
        setSelectedSubscriptionName(e.target.value)
        setSelectedSubscription(subscriptions.find(i=>i.id===e.target.value) || {
          id:'none',
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
      <option value={'none'}>(Select A Subscription Size)</option>
    </select>:
    <div>loading subscription sizes...</div>
      }
      <div>
        {selectedSubscription.id!=='none'?
        <div>
          {selectedSubscription.name}
          <div>max points for this size: {selectedSubscription.maxValue}</div>
          <div>max volume for this size: {selectedSubscription.maxVolume}</div>
        </div>:
        <div>Select A Subscription Size To Get Started!</div>}
      </div>

    {/* products */}
    <div>
    Total Points Added To Box: {totalPoints}/{selectedSubscription.maxValue}
    </div>
    <div>
    Total Volume Added To Box: {totalVolume}/{selectedSubscription.maxValue}
    </div>
    
      {categories?<div>

      {categories.map(category=>{
        return(
          <>
            <div>
              <b>Category: {category.name}</b>
            </div>
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
          </>
        )
      })}</div>:<>loading...</>}


    {/* save button */}
    <button
    disabled={totalPoints===0 || totalVolume===0}
    >
      Save
    </button>
    </div>
  );
}

export default App;

import React,{useEffect,useState} from "react";
import './App.css';
import Product from './components/Product';

function App() {
  //inital state
  const [products,setProducts]=useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [selectedSubscriptionName,setSelectedSubscriptionName] = useState("none");
  const [selectedSubscription,setSelectedSubscription] = useState({
    id:'none',
    maxVolume:0,
    maxPoints:0,
  });
  const [totalPoints, setTotalPoints] = useState(0)
  const [totalVolume,setTotalVolume] = useState(0)
  const [productsAmount,setProductsAmount] = useState([])

  useEffect(()=>{
    //fetch products array and setState for products
    fetch('https://mystifying-spence-dc3bda.netlify.app/build-a-box/products.json')
    .then(data=>data.json())
    .then(json=>{
      setProducts(json.products)
      setProductsAmount(json.products.map(product=>0))
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
    <div>loading subscriptions...</div>
      }
      <div>
        {selectedSubscription.id!=='none'?
        <div>
          {selectedSubscription.name}
          <div>max points: {selectedSubscription.maxValue}</div>
          <div>max volume: {selectedSubscription.maxVolume}</div>
        </div>:
        <div>select a box</div>}
      </div>

    {/* products */}
    <div>
    Total Points: {totalPoints}
    </div>
    <div>
    Total Volume: {totalVolume}
    </div>
    {products?
    <div>
      {products.map((product,idx)=>{
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
      })}
    </div>:<>loading products...</>}

    </div>
  );
}

export default App;

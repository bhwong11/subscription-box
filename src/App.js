import React,{useEffect,useState} from "react";
import './App.css';
import Product from './components/Product';

function App() {
  const [products,setProducts]=useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [selectedSubscriptionName,setSelectedSubscriptionName] = useState("none");
  const [selectedSubscription,setSelectedSubscription] = useState({
    maxVolume:0,
    maxPoints:0,
  });
  const [totalPoints, setTotalPoints] = useState(0)
  const [totalVolume,setTotalVolume] = useState(0)
  useEffect(()=>{
    fetch('https://mystifying-spence-dc3bda.netlify.app/build-a-box/products.json')
    .then(data=>data.json())
    .then(json=>{
      setProducts(json.products)
    })

    fetch('https://mystifying-spence-dc3bda.netlify.app/build-a-box/subscriptions.json')
    .then(data=>data.json())
    .then(json=>{
      setSubscriptions(json.subscriptions)
    })
  },[])
  return (
    <div className="App">
      Hello World!
      {subscriptions?<>{subscriptions[0].name}</>:<>loading subscriptions...</>}
      {products?<>{products[0].name}</>:<>loading products...</>}

      {/* select subscription box */}
      {subscriptions?
      <select 
      value={selectedSubscriptionName} 
      onChange={(e)=>{
        setSelectedSubscriptionName(e.target.value)
        setSelectedSubscription(subscriptions.find(i=>i.id===e.target.value))
      }} 
    >
      <option value="none">(select a box)</option>
      {subscriptions.map((subscription=>{
        return <option value={subscription.id}>{subscription.name}</option>
      }))}
    </select>:
    <div>loading subscriptions</div>
      }
      <div>
        {selectedSubscription?<>{selectedSubscription.name}{console.log(selectedSubscription)}</>:<>select a box</>}
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
      {products.map(product=>{
        return(
          <div>
          {products.name}
          {product.description}
          {product.volume}
          {product.points}
            <div>
              <span onClick={(e)=>{
                if(totalPoints+product.points<=selectedSubscription.maxValue && totalVolume+product.volume<=selectedSubscription.maxVolume){
                  setTotalPoints(totalPoints+product.points)
                  setTotalVolume(totalVolume+product.volume)
                }
              }}>+</span>
              <span onClick={(e)=>{
                if(totalPoints-product.points>0 && totalVolume-product.volume>0){
                  setTotalPoints(totalPoints-product.points)
                  setTotalVolume(totalVolume-product.volume)
                }else{
                  setTotalPoints(0)
                  setTotalVolume(0)                 
                }

              }}>-</span>
            </div>

            <Product 
            key={product.id} 
            product={product} 
            setTotalPoints={setTotalPoints} 
            setTotalVolume={setTotalVolume} 
            totalPoints = {totalPoints} 
            totalVolume={totalVolume}
            selectedSubscription={selectedSubscription}/>
          </div>
        )
      })}
    </div>:<>loading products...</>}

    </div>
  );
}

export default App;

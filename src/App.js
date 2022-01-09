import React,{useEffect,useState} from "react";
import './App.css';

function App() {
  const [products,setProducts]=useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
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
    </div>
  );
}

export default App;

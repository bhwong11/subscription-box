import React,{useState,useEffect} from 'react';

const Product =({product,setTotalPoints,setTotalVolume,totalVolume,totalPoints,selectedSubscription})=>{
    const [productAmount,setProductAmount] = useState(0)
    return(
        <div>
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>volume: {product.volume}</div>
        <div>points: {product.points}</div>
          <div>
            <span onClick={(e)=>{
              if(totalPoints+product.points<=selectedSubscription.maxValue && totalVolume+product.volume<=selectedSubscription.maxVolume){
                setTotalPoints(totalPoints+product.points)
                setTotalVolume(totalVolume+product.volume)
                setProductAmount(productAmount+1)
              }
            }}>+</span>
            {productAmount}
            <span onClick={(e)=>{
              if(totalPoints-product.points>0 && totalVolume-product.volume>0){
                setTotalPoints(totalPoints-product.points)
                setTotalVolume(totalVolume-product.volume)
                setProductAmount(productAmount-1)
              }else{
                setTotalPoints(0)
                setTotalVolume(0)  
                setProductAmount(0)               
              }

            }}>-</span>
          </div>
        </div>
    )
}

export default Product
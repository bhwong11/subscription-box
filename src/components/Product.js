import React from 'react';

const Product =({
    product
    ,setTotalPoints
    ,setTotalVolume
    ,totalVolume
    ,totalPoints
    ,selectedSubscription
    ,setProductsAmount
    ,productsAmount
    ,productIndex
})=>{
    return(
        <div className="product-container">
            <div>Name: {product.name}</div>
            <div>Description: {product.description}</div>
            <div>volume: {product.volume}</div>
            <div>points: {product.points}</div>
          <div>
            <button 
            disabled={!(totalPoints+product.points<=selectedSubscription.maxValue && totalVolume+product.volume<=selectedSubscription.maxVolume)}
            onClick={(e)=>{
              if(totalPoints+product.points<=selectedSubscription.maxValue && totalVolume+product.volume<=selectedSubscription.maxVolume){
                //update total points on main page and amount
                setTotalPoints(totalPoints+product.points)
                setTotalVolume(totalVolume+product.volume)
                const productsAmountCopy = [...productsAmount]
                productsAmountCopy[productIndex]++
                setProductsAmount(productsAmountCopy)
              }
            }}>+</button>

            <span>products amount: {productsAmount[productIndex]}</span>

            <button 
            disabled={!(productsAmount[productIndex])}
            onClick={(e)=>{
              if(totalPoints-product.points>=0 && totalVolume-product.volume>=0){
                //update total points on main page and amount
                setTotalPoints(totalPoints-product.points)
                setTotalVolume(totalVolume-product.volume)
                const productsAmountCopy = [...productsAmount]
                productsAmountCopy[productIndex]--
                setProductsAmount(productsAmountCopy)
              }else{
                setTotalPoints(0)
                setTotalVolume(0)  
                const productsAmountCopy = [...productsAmount]
                productsAmountCopy[productIndex]=0
                setProductsAmount(productsAmountCopy)               
              }

            }}>-</button>
          </div>
        </div>
    )
}

export default Product
import React,{useState,useEffect} from 'react';

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
                const productsAmountCopy = [...productsAmount]
                productsAmountCopy[productIndex]++
                setProductsAmount(productsAmountCopy)
              }
            }}>+</span>
            products amount: {productsAmount[productIndex]}
            <span onClick={(e)=>{
              if(totalPoints-product.points>0 && totalVolume-product.volume>0){
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

            }}>-</span>
          </div>
        </div>
    )
}

export default Product
import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { createOrder } from './helper/OrderHelper';

const Cod = ({ products, setReload = f => f, reload=undefined}) => {

    const [info, setInfo] = useState({
        loading : false,
        success : false,
        error : "",
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const onPurchase = () => {
        setInfo({ loading: true });
              const orderData = {
                  products : products,
              }
                createOrder(userId, token, orderData);
                cartEmpty(() => {
                    console.log("PAYMENT SUCCESS");
                    console.log("Cart empty success")
                })
                setReload(!reload);
      };


    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.product_price
        })
        return amount;
    }

    return (
        <div>
        { (products.length > 0 && isAuthenticated())? <button className="r-cod" onClick={onPurchase}>Go with COD Rs. {getAmount()}</button> : "" }
            {/* <button className="btn btn-outline-primary" onClick={onPurchase}>Go with COD Rs. {getAmount()}</button> */}
        </div>
    )
}

export default Cod; 
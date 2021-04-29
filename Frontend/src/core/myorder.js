import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper';
import "../styles.css"
import Base from './Base';
import Card from './Card';
import ImageHelper from './helper/ImageHelper';



import { userPurchaseList } from './helper/OrderHelper';

export default function Delivery() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;


    const loadAllOrders = () => {
        userPurchaseList(userId, token).then(data => {
            // console.log(userId);
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
                console.log(data);
            }


        })
    }

    useEffect(() => {

        loadAllOrders();
        // userPurchaseList(userId,token);
    }, [])

    return (
        <Base title="My Order" description="Happy Shopping">
            <div className="r-delivery-1">
                {products.map((product, index) => {
                    return (
                        <div key={index} className="r-delivery-2">
                            {product.products.map((prod) => {
                                return (
                                    <div className="r-delivery-3">
                                        <div className="r-first">
                                            <ImageHelper product={prod} />
                                        </div>
                                        <div className="r-second">
                                            Product Name: {prod.product_name}<br />
                                            Product Price : {prod.product_price} <br />
                                            Status : {product.status}
                                        </div>               
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </Base>
    );
}

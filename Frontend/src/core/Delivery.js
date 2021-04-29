import React, { useState, useEffect} from 'react'
import { getProduct } from '../admin/helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { API } from '../backend';
import "../styles.css"
import Base from './Base';
import Card from './Card';
import { getAllOrders, userPurchaseList } from './helper/OrderHelper';
import ImageHelper from './helper/ImageHelper';


export default function Delivery() {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(false)

    const { user : { first_name, last_name, email, address,  phone}} = isAuthenticated();

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;


        // const loadAllOrders = () => {
            getAllOrders(userId,token).then(data => {
                // console.log(userId);
                if(data.error) {
                    setError(data.error);
                } else {
                    setOrders(data);
                    // console.log(data);
                }                
            })
        // }

        useEffect(() => {
            // loadAllOrders();
            getAllOrders(userId,token);
        }, [])

    return (
        <Base title="Delivery Page" description="Take your order">
            <div className="r-delivery-1">

                    {orders.map((order, index) => {
                        return (
                            <div key={index} className="r-delivery-2">
                                
                                    {order.products.map((prod) => {
                                        return (
                                            <div className="r-delivery-3">

                                                    <div className="r-first">
                                                        <ImageHelper product = {prod} />
                                                    </div>
                                                    <div className="r-second">
                                                        Product Name: {prod.product_name}<br/>
                                                        Product Price : {prod.product_price}<br/>
                                                        Seller Address : {prod.adderess} <br/>
                                                        Seller no. : {prod.sphone}<br/>
                                                        Buyer Address : {order.user.address} <br/>
                                                        Buyer no. : {order.user.phone} <br/>
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

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { createOrder } from './helper/OrderHelper';
import { getmeToken, processPayment } from './helper/PaymentBHelper';
import DropIn from "braintree-web-drop-in-react"

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            console.log("INFO : ", info)
            if (info && info.error) {
                setInfo({ ...info, error: info.error });
            } else {
                const clientToken = info.clientToken;
                setInfo({ clientToken })
            }
        })
    }

    const showbtndropIn = () => {
        return (
            <div>

                { info.clientToken !== null && products.length > 0 ? (
                    <div>

                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />

                        <button className="r-payment-button" onClick={onPurchase}>Confirm payment</button>

                    </div>
                ) : (
                    <h3>Please add item in cart</h3>
                )}
            </div>
        )
    }

    useEffect(() => {
        getToken(userId, token);
    }, [])

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {

            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESS");

                    const orderData = {
                        products: products,
                        transactionId: response.transaction.id,
                        amount: response.transaction.amount,
                    }
                    //   console.log("IN PAY ", orderData);
                    createOrder(userId, token, orderData);
                    cartEmpty(() => {
                        console.log("Cart empty success")
                    })
                    setReload(!reload);
                })
                .catch(error => {
                    setInfo({ loading: false, success: false });
                    console.log("PAYMENT FAILED");
                });
        });
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
            <h3 className="r-payment-total">Total amount Rs. {getAmount()}</h3>
            {isAuthenticated() ? showbtndropIn() : "For Purchase the item Please do LogIn First Or Create an account"}
            {/* {showbtndropIn()} */}
        </div>
    )
}

export default Paymentb;
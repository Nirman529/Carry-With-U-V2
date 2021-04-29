import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend';
import { createOrder } from './helper/OrderHelper';

const StripeCheckout = ( { products, setReload = f => f, reload=undefined }) => {
    
    const [ data, setData] = useState({
        loading : false,
        success : false,
        error : "",
        address : ""
    })

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
  
    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.product_price;
        })
        return amount;
    }

    const makePayment = token => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type" : "application/json"
        }
        return fetch(`${API}/stripePayment`, {
            method : "POST",
            headers,
            body : JSON.stringify(body)
        }).then(response => {
            console.log(response);

            const { status} = response;
            console.log("STATUS", status);
        }).catch(error => console.log(error))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton 
                stripeKey="pk_test_51IehW4SA6qcYHM47tqBhAGg5OrgPswEEBirjf8WXYlUEohGKXnsJ0RYVrKJ45fP0eth9OGqCEnvsuQH7Uy8uC5V200fhxA4ngW"
                token={makePayment}
                amount={getFinalAmount()*100}
                name="Carry With U"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-outline-primary">Pay using Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-danger">Sign in</button>
            </Link>    
        )
    }
   
    return (
        <div>
            <h3 className="text-white">StripeCheckout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;
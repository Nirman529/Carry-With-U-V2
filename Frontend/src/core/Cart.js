import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper';
import { API } from '../backend';
import "../styles.css"
import Base from './Base';
import Card from './Card';
import Cod from './Cod';
import { loadCart } from './helper/CartHelper';
import Paymentb from './Paymentb';
import StripeCheckout from './StripeCheckout';

const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = products => {
        return (
            <div className="r-cart-products">
                {/* <h2>Load product section</h2> */}
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addToCart={false}
                        setReload={setReload}
                        reload={reload}
                    />)
                )}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>Checkout section</h2>
            </div>
        )
    }

    return (
        <Base title="Cart page" description="Go with checkout">
            <div className="r-cart">
                <div className="r-cart-products-part col-6">{products.length > 0 ? loadAllProducts(products) : <h3>No products in the cart</h3>}</div>
                <h1></h1>
                {/* <div className="col-6"><StripeCheckout
                    products={products}
                    setReload={setReload}
                /></div> */}
                <div className="">
                    <Cod products={products}
                        setReload={setReload}
                    />
                </div>
                { isAuthenticated() ? <div className="r-or">Or</div> : ""}
                {/* <div className="r-or">Or</div> */}
                <div className= "r-payment">
                    <Paymentb
                        products={products}
                        setReload={setReload}
                    />
                </div>
            </div>
        </Base>
    );
}

export default Cart;
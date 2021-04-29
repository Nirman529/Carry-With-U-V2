import React, { useState, useEffect} from 'react'
import { Redirect } from 'react-router';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({
    product,
    addToCart=true, 
    removeFromCart=false , 
    setReload = f => f,
    // function(f) { return f}
    reload = undefined
  }) => {

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const cardName = product ? product.product_name : "It's U LD"
    const cardPrice = product ? product.product_price : "17022002"
    const cardDescription = product ? product.description : "NO DESCRIPTIOBN"

    const addtoCart = () => {
      addItemToCart(product, () => setRedirect(true))
    }
  
    const getaRedirect = (redirect) => {
      if(redirect) {
        return <Redirect to="/cart" />
      }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && <button
            onClick={addtoCart}
            className="r-product-button"
          >
            Add to Cart
          </button>
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="r-product-button"
          >
            Remove
          </button>
        )
    }

        return (
          // <div className="card text-white bg-dark border border-info ">
          <div className="r-card">
            {/* <div className="card-body"> */}
            <div className="r-card-body">
              {getaRedirect(redirect)}
              <ImageHelper product={product}/>
              <div className="r-product-name">{cardName}</div>
              <p className="r-product-description">
                {cardDescription}
              </p>
              <p className="r-product-price">Rs. {cardPrice}</p>
              <div className="r-button-cover row">
                <div className="col-12">
                  {showAddToCart(addToCart)}
                </div>
                <div className="r-button-cover col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };

      export default Card;

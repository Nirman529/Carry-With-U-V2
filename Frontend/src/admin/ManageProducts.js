import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getAllProducts } from './helper/adminapicall';

const ManageProducts = () => {

  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    })
  }

  useEffect(() => {
    preload();
  }, [])

  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    })
  }

  return (
    <Base title="Welcome admin" description="Manage products here" className="r-manage-main-main">
      <h2 className="mb-4">All products:</h2>
      <Link className="r-category-home" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="r-manage-main">
        <div className="r-manage-main-body">
          <h2 className="r-manage-h2">Total products</h2>

          {products.map((product, index) => {
            return (<div key={index} className="r-manage-body">
              <div className="col-4">
                <h3 className="r-manage-type">{product.product_name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="r-manage-type-button"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                  deleteThisProduct(product._id)
                }} className="r-manage-type-del-button r-manage-type-button">
                  Delete
              </button>
              </div>
            </div>)
          })}


        </div>
      </div>
    </Base>
  )
}

export default ManageProducts;
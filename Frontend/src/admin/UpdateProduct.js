import React, { useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getAllCategory, getProduct, updateProduct } from './helper/adminapicall';

const UpadateProduct = ({match}) => {

    const { user, token} = isAuthenticated();

    const [values, setValues] = useState({
        product_name : "",
        product_price : "",
        description : "",
        adderess : "",
        stock : "",
        sphone : "",
        image : "",
        category_type : "",
        categories : "",
        loading : false,
        error : "",
        createdProduct : "",
        getRedirect : false,
        formData : ""
    })

    const { product_name, sphone, product_price, description, adderess, stock, image, category_type, categories, loading, error, createdProduct, getRedirect, formData} = values;

    const preload = (productId) => {
        getProduct(productId).then(data => {
            // console.log(data);
            if(data.error) {
                setValues({ ...values, error : data.error});
            } else {
                preloadCategories();
                setValues({ 
                    ...values,
                    product_name : data.product_name,
                    product_price : data.product_price,
                    description : data.description,
                    adderess : data.adderess,
                    stock : data.stock,
                    sphone :data.sphone,
                    category_type : data.category_type._id,
                    formData : new FormData()
                });
            }
        });
    };

    const preloadCategories = () => {
      getAllCategory().then(data => {
        if(data.error) {
          setValues({ ...values, error : data.error});
        } else {
          setValues({
            categories : data,
            formData : new FormData()
          })
        }
      })
    }

    useEffect(() => {
            preload(match.params.productId);
    },[]);

    const performRedirect = () => {
        if (getRedirect) {
            return <Redirect to="/admin/dashboard" />;
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error : "", loading : true})
        updateProduct( match.params.productId, user._id, token, formData).then(data => {
            if(data.error) {
                setValues({ ...values, error : data.error})
            } else {
                setValues({
                    ...values,
                    product_name : "",
                    product_price : "",
                    description : "",
                    adderess : "",
                    sphone : "",
                    stock : "",
                    image : "",
                    category_type : "",
                    loading : false,
                    createdProduct : data.product_name
                })
            }
        })
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }


    const successMessage = () => {
        return(<div className="alert alert-success mt-3" style={{ display : createdProduct ? "" : "none"}}>
            <h4>{ createdProduct} updated successfully</h4>
        </div>
        );
    }
    
    const errorMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to update product</h4>;
        }
    };

    const  handleChange = product_name => event => {
        const value = product_name === "image" ? event.target.files[0] : event.target.value;
        formData.set(product_name, value);
        setValues({ ...values, [product_name] : value})
    }

    const createProductForm = () => (
        <form >
          {/* <span>Post photo</span> */}
          <div className="form-group mb-1">
            <label className="r-add-file">
              <input
                onChange={handleChange("image")}
                type="file"
                name="image"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="r-add-field">
            <input
              onChange={handleChange("product_name")}
              name="image"
              className="form-control"
              placeholder="Product Name"
              value={product_name}
            />
          </div>
          <div className="r-add-field">
            <textarea
              onChange={handleChange("description")}
              name="image"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="r-add-field">
            <input
              onChange={handleChange("product_price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={product_price}
            />
          </div>
          <div className="r-add-field">
          <input
              onChange={handleChange("sphone")}
              type="phone"
              className="form-control"
              placeholder="Mobile no."
              value={sphone}
            />
            </div>
          <div className="r-add-field">
            <select
              onChange={handleChange("category_type")}
              className="form-control"
              placeholder="Category"
            >
              <option>Category</option>
              {categories && categories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                      {cate.category_type}
                  </option>
              ))}
            </select>
          </div>
          <div className="r-add-field">
            <textarea
              onChange={handleChange("adderess")}
              name="image"
              className="form-control"
              placeholder="adderess"
              value={adderess}
            />
          </div>
          <div className="r-add-field">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="r-add-prod-submit">
            Update Product
          </button>
        </form>
      );

    return (
        <Base title="Add product here" description="Welcome to product create part" className="r-form-background">
            <Link to="/admin/dashboard" className="r-add-prod-home">Admin Home</Link>
            <div  className="">
                <div className="r-product-form">
                    {loadingMessage()}
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                    {performRedirect()}
                </div>
            </div>
        </Base>
    )
}

export default UpadateProduct;
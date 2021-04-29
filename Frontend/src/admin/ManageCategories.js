import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getAllCategory, deleteCategory } from './helper/adminapicall';

const ManageCategories = () => {

  const [categories, setCategories] = useState([]);


  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategory().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    })
  }

  useEffect(() => {
    preload();
  }, [])

  const deleteThisCategory = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    })
  }

  return (
    <Base title="Welcome admin" className="r-manage-main-main" description="Manage products here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="r-category-home" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="r-manage-main">
        <div className="r-manage-main-body">
          <h2 className="r-manage-h2">Total Categories</h2>

          {categories.map((category, index) => {
            return (<div key={index} className="r-manage-body">
              <div className="col-4">
                <h3 className="r-manage-type">{category.category_type}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="r-manage-type-button"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="">
                <button onClick={() => {
                  deleteThisCategory(category._id)
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
export default ManageCategories;
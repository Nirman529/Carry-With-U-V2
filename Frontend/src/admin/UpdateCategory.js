import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({match}) => {
  const [category_type, setCategory_type] = useState("");
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="r-category-home" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );
  const preload = (categoryId) => {
     getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(match.params.categoryId);
  
            console.log("Insigle category error");
        } else {
        console.log(match.params.categoryId);
  
          setCategory_type( data.category_type );
        }
      });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = () => event => {
    setCategory_type( event.target.value );
  };

  const onSubmit = categoryId => {
    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, category_type).then(data => {
      if (data.error) {
        console.log("client error");
    } else {
        setCategory_type({category_type : ""});
        // preload();
      }
    //   console.log(match.params.category_type);
    });
  };
  


  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("category_type")}
          value={category_type}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="r-manage-type-button">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="r-add-category-body-1"
    >
      <div className="row bg-white rounded">
        <div className="r-add-category-body-3">
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;

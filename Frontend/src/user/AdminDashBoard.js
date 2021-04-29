import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";

const AdminDashBoard = () => {
//role
  const { user : { first_name, last_name, address, email, phone}} = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="r-card-header card-header">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="r-a-nav-link nav-link">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="r-a-nav-link nav-link">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="r-a-nav-link nav-link">
              Create Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="r-a-nav-link nav-link">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="r-r-card-header card-header">Admin Info</h4>
        <ul className="list-group">
          <li className="r-list-group-item">
            <span className="r-badge">Name:</span> {first_name} {last_name} 
          </li>
          <li className="r-list-group-item ">
            <span className="r-badge">Email:</span> {email}
          </li>
          <li className="r-list-group-item">
            <span className="r-badge">Phone:</span> {phone}
          </li>
          <li className="r-list-group-item">
            <span className="r-admin-badge">Admin Area</span> {address}
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Base title="AdminDashBoard page" description="Manage your Project" className="container bg-white p-4">
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;

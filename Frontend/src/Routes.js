import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./core/Home"
import Signin from './user/Signin'
import Signup from './user/Signup'
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpadateCategory from './admin/UpdateCategory'
// import  from './admin/Orders'
import Cart from './core/Cart'
import orders from './admin/Orders'
// import Delivery from './user/Delivery'

import Delivery from './core/Delivery'
import myorder from './core/myorder'
import Aboutus from './core/Aboutus'
import NotFound from './core/NotFound'

const Routes = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/aboutus" exact component={Aboutus} />

          <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
          <AdminRoute path="/admin/create/category" exact component={AddCategory} />
          <AdminRoute path="/admin/categories" exact component={ManageCategories} />
          <AdminRoute path="/admin/create/product" exact component={AddProduct} />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
          <AdminRoute path="/admin/category/update/:categoryId" exact component={UpadateCategory} />
          <Route path="/orders" exact component={orders} />
          <Route path="/delivery" exact component={Delivery} />
          <Route path="/myorder" exact component={myorder} />
          <Route path="" component={NotFound} />        
        
        </Switch>
      </BrowserRouter>
  )
}

export default Routes;

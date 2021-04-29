import React, {Fragment} from 'react'
import { Link, withRouter} from "react-router-dom"
import { signout, isAuthenticated } from '../auth/helper'

const currentTab = (history, path) => {
    if(history.location.pathname === path) {
        return { color : "#FFFFFF", fontWeight: "bolder"}
    } 
}

// Raj : changed className nav-link -> nav-option

const Menu = ({history}) => (
    <div className="Menu">
        <div className="logo">Carry With U</div>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link style={currentTab(history,"/")} className="nav-option" to="/">
                    Home
                </Link>
            </li>
            {/* <li className="nav-item">
                <Link style={currentTab(history,"/cart")} className="nav-option" to="/cart">
                    Cart
                </Link>
            </li> */}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
            <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-option"
                to="/user/dashboard"
            >
                U. Dashboard
            </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
            <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-option"
                to="/admin/dashboard"
            >
                A. Dashboard
            </Link>
            </li>
            )}
            { !isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signup")} className="nav-option" to="/signup">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signin")} className="nav-option" to="/signin">
                        Signin
                    </Link>
                </li>
            </Fragment>

            )}
            { isAuthenticated() && (        
                <li className="nav-item">
                    <span className="nav-option" 
                        onClick={() => {
                            signout(() => {
                                history.push("/");
                            });
                    }}
                    >
                        Signout
                    </span>
                </li>
            )}


            
            {/* <li className="nav-item">
                <Link style={currentTab(history,"/delivery")} className="nav-link" to="/delivery">
                    Delivery
                </Link>
            </li> */}
            { isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                <Link style={currentTab(history,"/delivery")} className="nav-option" to="/delivery">
                        Delivery
                </Link>
                </li>
                <li className="nav-item">
                <Link style={currentTab(history,"/myorder")} className="nav-option" to="/myorder">
                    My Orderes
                </Link>
            </li>
            </Fragment>
            )}
            {/* <li className="nav-item">
                <Link style={currentTab(history,"/aboutus")} className="nav-option" to="/aboutus">
                    About Us
                </Link>
            </li> */}
            <li className="nav-item">
                <Link style={currentTab(history,"/cart")} className="r-cart-back nav-option" to="/cart">
                    <div className="r-cart-image"></div>
                    Cart
                </Link>
            </li>
        </ul>
    </div>
)
export default withRouter(Menu);
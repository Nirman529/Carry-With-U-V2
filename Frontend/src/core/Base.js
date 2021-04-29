import React from 'react'
import Menu from './Menu';

const Base = ({
    title = "My Title",
    description = "My Description",
    className = "",
    children
}) => (
    <div className="bg-white">
        <Menu />
        <div className="bg-white">
            {/* <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-5">{title}</h2>
                    <p className="lead">{description}</p>
                </div> */}
            <div className={`${className}`}>{children}</div>
        </div>
        <footer className="r-footer">
            <div className="r-f-1">
                <h1>Online Shopping</h1>
                <ul>
                    <li>Men</li>
                    <li>Women</li>
                    <li>Kids</li>
                    <li>Jewelry</li>
                    <li>Shoes</li>
                    <li>Beauty Products</li>
                </ul>
            </div>
            <div className="r-f-1">
                <h1>Useful Links</h1>
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>FAQ</li>
                    <li>Privacy policy</li>
                    <li>Shipping</li>
                </ul>
            </div>
            <div className="r-f-1">
                <h1>Developers</h1>
                <ul>
                    <li>Raj Mangukiya</li>
                    <li>Dixit Lukhi</li>
                    <li>Nirman Malaviya</li>
                    <li>Piyush Mathukiya</li>
                </ul>
            </div>
            <div className="r-f-2">
                <div className="r-f-original">
                    100% ORIGINAL
                </div>
                <div className="r-f-delivery">
                    GET FREE DELIVERY<br></br><i>order above Rs. 1599</i>
                </div>
                <div className="r-f-returns">
                    NO RETURNS
                </div>
                <div className="r-f-original">
                    <li>+91 9328126134</li>
                    <li>carrywithu@gmail.com</li>
                </div>
            </div>
        </footer>
    </div>
);

export default Base;
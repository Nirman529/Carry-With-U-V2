import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashBoard = () => {

  const { user : { first_name, last_name, email, address,  phone}} = isAuthenticated();


  return (
    <Base title="UserDashBoard page">
        <ul className="r-list-group ">
                    <li className="r-list-group-item">
                        <span className="r-badge mr-2">Name:</span> {first_name} {last_name} 
                        {/* {first_name} {last_name}  */}
                    </li>
                    <li className="r-list-group-item ">
                        <span className="r-badge mr-2">Email:</span> {email}
                    </li>
                    <li className="r-list-group-item">
                        <span className="r-badge mr-2">Phone:</span> {phone}
                    </li>
                    <li className="r-list-group-item">
                        <span className="r-badge">User Area</span> {address}
                    </li>
                </ul>
    </Base>
  );
};

export default UserDashBoard;

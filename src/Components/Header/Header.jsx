import React from "react";
import './style.css';
import logo from "../FormDomain/logo.gif";

export default function Header({children}) {
  return (
    <div className="header form">
        <div className="logoSection">
            <img src={logo} alt="logo"/>
            <div>
                <h1 className="marginNone">RateWatch</h1>
                <h3 className="marginNone subHeader">View your site's keyword rankings in Google.</h3>
            </div>
        </div>
        {children}
    </div>

  );
}

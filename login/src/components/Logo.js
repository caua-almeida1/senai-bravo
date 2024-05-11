import React from 'react'
import logo from '../img/Logo_logo.svg'

const Logo = () =>{
    return(
        <div className="logo">
            <div className="logo-icon">
                <img src={logo} width={"35px"}></img>
            </div>
        </div>

    )
}

export default Logo
import React from 'react';
import './Header.css';
import Logo from '../../assets/logo.svg';
import Button from "@material-ui/core/Button";
import ModalContainer from '../login/ModalContainer';

export default function Header(props){
    return(
        <div className="header">
            <div className="logo">
                <img src={Logo}  alt="logo"/>
            </div>
            <Button className="login-button-class"
                    type="submit" variant="contained" color="primary">
                login
            </Button>
            <ModalContainer {...props}/>
        </div>);
}
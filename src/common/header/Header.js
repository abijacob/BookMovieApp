import React from 'react';
import './Header.css';
import Logo from '../../assets/logo.svg';
import Button from "@material-ui/core/Button";
import ModalContainer from '../login/ModalContainer';
import {Link} from "react-router-dom";

export default function Header(props){
    const [openLoginModal, setOpenLoginModal] = React.useState(false);

    const handleClose = () => {
        setOpenLoginModal(!openLoginModal);
    };

    return(
        <div className="header">
            <div className="logo">
                <img src={Logo}  alt="logo"/>
            </div>
            <Button className="login-button-class"
                    onClick={()=>{
                        setOpenLoginModal(!openLoginModal)
                    }}
                    type="submit" variant="contained" color="primary">
                login
            </Button>

            <ModalContainer handleClose={handleClose} addModal={openLoginModal} {...props}/>
            <Link to={"/bookshow/"+"7d174a25-ba31-45a8-85b4-b06ffc9d5f8f"}>
                <Button variant="contained" color="primary">
                    Book Show
                </Button>
            </Link>
        </div>);
}
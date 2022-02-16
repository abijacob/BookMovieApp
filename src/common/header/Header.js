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
    console.log("props")
    console.log(props)
    return(
        <div className="header">
            <div className="logo">
                <img src={Logo}  alt="logo"/>
            </div>
            <div className="login-button-div">
                <div>
                    <Link to={"/bookshow/"+props.bookShow}>
                        <Button variant="contained" color="primary">
                            Book Show
                        </Button>
                    </Link>
                    <Button className="login-button-class"
                            onClick={()=>{
                                setOpenLoginModal(!openLoginModal)
                            }}
                            type="submit" variant="contained" color="primary">
                        login
                    </Button>
                </div>
            </div>
            <ModalContainer handleClose={handleClose} addModal={openLoginModal} {...props}/>

        </div>);
}
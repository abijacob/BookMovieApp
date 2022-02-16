import React from 'react';
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Login from "./Login";
import Register from "./Register";
import {Tab} from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabPanel"
            hidden={value !== index}
            id={`simple-tabPanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (

                <div>{children}</div>

            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabPanel-${index}`,
    };

}

function getModalStyle() {
    const top = 0 ;
    const left = 0 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        'marginTop': "5%",
        'marginLeft': '35%',
        'backgroundColor': 'white',
        height: '500px',
        width: '350px'
    };
}

const ModalContainer = (props) => {
    console.log(props);
    const [modalStyle] = React.useState(getModalStyle);
    const [value, setValue] = React.useState(0);
    const [isLogin, setIslogin] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleIsLogin = (e) => {
        if(e.clicked){
            setIslogin(!isLogin);
        }
    };

    const body = (
        <div style={modalStyle} className="modalContainer">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
            >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Register"  {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Login {...props} loginHandle={handleIsLogin} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Register {...props} />
            </TabPanel>

        </div>
    );

    return (
        <div>

            <Modal
                open={props.addModal}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
};

export default ModalContainer;
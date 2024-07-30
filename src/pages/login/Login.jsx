import {
    Box,
    Button,
    Input,
    Modal,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import logo from "./Logo2Cropped.png";
import background from './animatedLogin.svg'
import styles from "./login.module.scss";

function Login() {
    const [userType, setUserType] = React.useState("client");

    const handleChange = (e, userType) => {
        if (userType !== null) {
            setUserType(userType);
        }
    };

    return (
        <Box sx={{backgroundImage: `${background}`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <form>
                <Box width={"500px"}>
                    <img src={logo} className={styles.logo} alt="logo" />
                </Box>
                <Box>
                    <Typography variant="h6">Login</Typography>
                    <ToggleButtonGroup
                        color="secondary"
                        value={userType}
                        exclusive
                        onChange={handleChange}
                        aria-label="User Type"
                    >
                        <ToggleButton value="client">Client</ToggleButton>
                        <ToggleButton value="trainer">Trainer</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box>
                    <Input placeholder="Enter email..." />
                    <Input placeholder="Enter password..." />
                    <AccountTypeModal />
                </Box>
            </form>
        </Box>
    );
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function AccountTypeModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} color="secondary">Create an account</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal} bgcolor={'primary.main'} color={"white"}>
                    <Typography variant="h4">Select account type:</Typography>
                    <CreateAccountModal onClick={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}

function CreateAccountModal() {
    const [open, setOpen] = React.useState(false);
    const [userType, setUserType] = useState();
    const handleOpen = (e) => {
        setUserType(e.target.value)
        setOpen(true);
    } 
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} value='client' variant="contained" color="secondary">Client</Button>
            <Button onClick={handleOpen} value='trainer' variant="contained" color="secondary">Trainer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal} bgcolor={'primary.main'}>
                    <form>
                        <Box>
                            <input placeholder="First Name" />
                            <input placeholder="Last Name" />
                            <input placeholder="Birth Date" />
                        </Box>
                        <Box>
                        <input placeholder="Email" />
                        <input placeholder="Phone" />
                        </Box>
                        <input placeholder="Password" />
                        <input placeholder="Retype Password" />
                        {userType === 'trainer' ? <input placeholder="Bio" /> : null}
                        <input placeholder="Certifications" />
                        <Button color="secondary" variant="contained">Create Account</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}


export default Login;

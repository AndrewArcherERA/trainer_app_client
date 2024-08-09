import {
    Alert,
    Box,
    Button,
    Input,
    Modal,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useState } from "react";
import logo from "./Logo2Cropped.png";
import background from "./animatedLogin.svg";
import styles from "./login.module.scss";
import { useDispatch } from "react-redux";
import { register } from "../../features/userSlice";

function Login() {
    const [userType, setUserType] = useState("client");

    const handleChange = (e, userType) => {
        if (userType !== null) {
            setUserType(userType);
        }
    };

    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                backgroundImage: `url(${background})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <Box
                component={"form"}
                bgcolor={"primary.main"}
                color={"white"}
                display={"flex"}
                flexDirection={"column"}
                p={2}
                gap={2}
                borderRadius={3}
            >
                <Box width={"500px"}>
                    <img src={logo} className={styles.logo} alt="logo" />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography variant="h5" minWidth={"33%"}>
                        Login
                    </Typography>
                    <ToggleButtonGroup
                        color="secondary"
                        value={userType}
                        exclusive
                        onChange={handleChange}
                        aria-label="User Type"
                        fullWidth
                    >
                        <ToggleButton
                            sx={{ color: "white", border: "1px solid white" }}
                            value="client"
                        >
                            Client
                        </ToggleButton>
                        <ToggleButton
                            sx={{ color: "white", border: "1px solid white" }}
                            value="trainer"
                        >
                            Trainer
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                >
                    <Box
                        width={"100%"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                    >
                        <Input
                            sx={{ color: "white", p: 2 }}
                            required
                            type="email"
                            placeholder="Enter email..."
                        />
                        <Input
                            sx={{ color: "white", p: 2 }}
                            required
                            type="password"
                            placeholder="Enter password..."
                        />
                    </Box>
                    <AccountTypeModal />
                </Box>
            </Box>
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} color="secondary">
                Create an account
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className={styles.modal}
                    bgcolor={"primary.main"}
                    color={"white"}
                >
                    <Typography variant="h4">Select account type:</Typography>
                    <CreateAccountModal />
                </Box>
            </Modal>
        </div>
    );
}

function CreateAccountModal() {
    const [open, setOpen] = useState(false);
    const [isSuccesful, setIsSuccesful] = useState(false);
    const [userType, setUserType] = useState();
    const dispatch = useDispatch();

    const handleOpen = (e) => {
        setUserType(e.target.value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            userType: userType,
            data: {
                f_name: e.target[0].value,
                l_name: e.target[1].value,
                dob: e.target[2].value,
                email: e.target[3].value,
                phone: e.target[4].value,
                hashed_pass: e.target[5].value,
                bio: e.target[7].value,
            },
        };

        dispatch(register(data));
        handleClose();
        // TODO: handle closing of both models or remove second model and only use one, render form based on button click
        setIsSuccesful(true);

        // TODO: handle adding certifications on frontend on register
        const certifications = {};
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
                value="client"
                variant="contained"
                color="secondary"
            >
                Client
            </Button>
            <Button
                onClick={handleOpen}
                value="trainer"
                variant="contained"
                color="secondary"
            >
                Trainer
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal} bgcolor={"primary.main"}>
                    <form onSubmit={handleSubmit}>
                        <Box>
                            <input placeholder="First Name" />
                            <input placeholder="Last Name" />
                            <input placeholder="Birth Date" />
                        </Box>
                        <Box>
                            <input placeholder="Email" />
                            <input placeholder="Phone" />
                        </Box>
                        {/* TODO: verification logiv that passwords match and dont let user submit form without */}
                        <input placeholder="Password" />
                        <input placeholder="Retype Password" />
                        {userType === "trainer" ? (
                            <input placeholder="Bio" />
                        ) : (
                            <input hidden placeholder="Bio" />
                        )}
                        <input placeholder="Certifications" />
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                        >
                            Create Account
                        </Button>
                    </form>
                </Box>
            </Modal>
            {isSuccesful ? (
                <Alert
                    variant="filled"
                    severity="success"
                    onClose={() => {
                        setIsSuccesful(false);
                    }}
                >
                    Account created!
                </Alert>
            ) : null}
        </div>
    );
}

export default Login;

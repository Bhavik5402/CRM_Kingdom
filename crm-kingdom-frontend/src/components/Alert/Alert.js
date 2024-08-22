import { Box, Button, Modal, Typography } from "@mui/material";
import { SuccessErrorModalContext, SuccessErrorModalDispatchContext } from "Context/AlertContext";
import React, { useContext } from "react";
import CrossRedIcon from "../../assets/images/red-cross-icon.svg";
import SuccessIcon from "../../assets/images/success-icon.svg";
import { successErrorModalStyle } from "utility/helper/constants";

export function SuccessErrorModal() {
    const successErrorContext = useContext(SuccessErrorModalContext);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const handleClickClose = () => {
        setSuccessErrorContext({
            isSuccessErrorOpen: false,
            title: "",
            message: "",
            isSuccess: true,
        });
        if (successErrorContext && successErrorContext.handleOnClickOk)
            successErrorContext.handleOnClickOk();
    };

    return (
        <>
            <Modal
                open={successErrorContext?.isSuccessErrorOpen}
                onClose={handleClickClose}
                className="reset-modal"
            >
                <Box sx={successErrorModalStyle}>
                    <img
                        src={successErrorContext.isSuccess ? SuccessIcon : CrossRedIcon}
                        alt="Done"
                        className="reset-img"
                    />
                    <Typography variant="h4">{successErrorContext?.title}</Typography>
                    <Typography variant="body1" sx={{ m: 2 }}>
                        {successErrorContext?.message}
                    </Typography>
                    <Button onClick={handleClickClose} variant="contained" title="close">
                        Ok
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

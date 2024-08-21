import { Box, Button, Modal, Typography } from "@mui/material";
import { WarningIcon } from "assets/images";
import { successErrorModalStyle } from "utility/helper/constants";
import "./warning-modal-style.css";

export const WarningModal = (props) => {
    // Extract props
    const {
        isModalOpen,
        handleOnClickCloseModal,
        title,
        warningMessage,
        okButtonText,
        closeButtonText,
        handleOnClickOk,
        warningIcon,
    } = props;

    // Events and functions
    const handleOnClickOkButton = () => {
        handleOnClickOk();
        handleOnClickCloseModal();
    };

    return (
        <Modal open={isModalOpen} onClose={handleOnClickCloseModal} className="reset-modal">
            <Box sx={successErrorModalStyle}>
                <img src={warningIcon ? warningIcon : WarningIcon} alt="warning" />
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body1">{warningMessage}</Typography>
                <div className="warning-modal-btn-group">
                    {okButtonText && (
                        <Button variant="contained" onClick={handleOnClickOkButton}>
                            {okButtonText}
                        </Button>
                    )}
                    {closeButtonText && (
                        <Button variant="outlined" onClick={handleOnClickCloseModal}>
                            {closeButtonText}
                        </Button>
                    )}
                </div>
            </Box>
        </Modal>
    );
};

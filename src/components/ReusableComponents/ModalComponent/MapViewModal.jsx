import React from 'react';
import {
    Box,
    Button,
    Modal,
    Backdrop,
    Fade,
} from '@mui/material';
import CustomMap from '../../ProductsComponent/CustomMapComponent/CustomMap';

const MapViewModal = ({ open, onClose, address }) => {
    // Check if product exists before rendering the modal content
    console.log(product)
    if (!product) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <CustomMap/>
                    <Button onClick={onClose} variant="contained" fullWidth sx={{ mt: 3 }}>
                        Ok, close
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};


export default MapViewModal;
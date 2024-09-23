import React, {useState, useEffect} from 'react';
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
    const [parseAddress, setParseAddress] = useState(null)

    useEffect(() => {
        if(address){
            const addressObject = JSON.parse(address)
            setParseAddress(addressObject)
        }

    },[address])

    if (!address) {
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
                        width: {xs: 350, sm: 400, md: 500, lg: 600},
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <CustomMap
                        mapDataValue={parseAddress}
                        Editing={false}
                        modalIsOpen={true} />
                    <Button onClick={onClose} variant="contained" fullWidth sx={{ mt: 3 }}>
                        Close
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};


export default MapViewModal;
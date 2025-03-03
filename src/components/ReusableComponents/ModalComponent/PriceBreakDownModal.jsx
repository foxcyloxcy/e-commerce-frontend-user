import React from 'react';
import {
    Box,
    Typography,
    Button,
    Modal,
    Backdrop,
    Fade,
    Divider,
} from '@mui/material';

// Price breakdown modal component
const PriceBreakdownModal = ({ open, onClose, product }) => {
    // Check if product exists before rendering the modal content
    if (!product) {
        return null;
    }

    // Use total_discount_breakdown if total_fee_breakdown is null
    const breakdown = product.total_fee_breakdown || product.total_discount_breakdown || {};

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
                    <Typography variant="h6" gutterBottom>
                        Price breakdown
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1">
                        Item: AED {product.price || product.asking_price || breakdown.item}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Platform fee: AED {breakdown.platform_fee || product.platform_fee} ({breakdown.platform_fee_percentage || product.platform_fee_percentage} of item price)
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Total: AED {breakdown.total || product.total}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Postage fees will be added at checkout.
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                        Our Platform fee is mandatory when you purchase an item on the platform. It is added to every purchase made with the 'Buy' button. The item price is set by the seller and may be subject to negotiation if the seller is accepting offers.
                    </Typography>
                    <Button onClick={onClose} variant="contained" fullWidth sx={{ mt: 3 }}>
                        Ok, close
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default PriceBreakdownModal;

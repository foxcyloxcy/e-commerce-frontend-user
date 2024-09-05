import React from 'react';
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';

const ImageViewModal = ({props, openModal, handleCloseModal, modalImageUrl}) => {

    return (
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <img src={modalImageUrl} alt="Product" style={{ maxWidth: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ImageViewModal;
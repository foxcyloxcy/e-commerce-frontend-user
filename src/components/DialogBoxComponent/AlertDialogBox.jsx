import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, ThemeProvider
  } from '@mui/material';
  import ModTheme from '../ThemeComponent/ModTheme';
  import ButtonComponent from '../ButtonComponent/ButtonComponent';
  import { useState } from 'react';

  const AlertDialogBox = (title, message, buttonLabelConfirm, buttonLabelCancel) => {
    const [promise, setPromise] = useState(null);
  
    const confirm = () => new Promise((resolve, reject) => {
      setPromise({ resolve });
    });
  
    const handleClose = () => {
      setPromise(null);
    };
  
    const handleConfirm = () => {
      promise?.resolve(true);
      handleClose();
    };
  
    const handleCancel = () => {
      promise?.resolve(false);
      handleClose();
    };
    // You could replace the Dialog with your library's version
    const ConfirmationDialog = () => (
      <ThemeProvider theme={ModTheme}>
      <Dialog
        open={promise !== null}
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonComponent
            onClick={handleConfirm}
            label={buttonLabelConfirm}
            buttonVariant="contained"
            textColor='primary.contrastText'
            hoverTextColor='primary.main'
          />
          <ButtonComponent
            onClick={handleCancel}
            label={buttonLabelCancel}
            buttonVariant="contained"
            textColor='primary.contrastText'
            hoverTextColor='primary.main'
          />
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    );
    return [ConfirmationDialog, confirm];
  };
  
  export default AlertDialogBox;
import { forwardRef, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/**
 * This component handles the creation of seconds long
 * Red and Green Flash Messages althrough the app.
 */

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FlashMessages = ({ open, message, onClose, severity }) => {
  const [states] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = states;

  return (
    <div>
      <Snackbar anchorOrigin={{ vertical, horizontal }} severity={severity} open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default FlashMessages
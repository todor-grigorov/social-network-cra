import React, { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertBar = () => {
    const [open, setOpen] = React.useState(false);

    const alertMesages = useSelector((state) => state.alertMesages);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        setOpen(true);
    }, [alertMesages]);

    return (
        <div className="alerts">
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Alert onClose={handleClose} severity={alertMesages.severity}>
                    {alertMesages.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertBar

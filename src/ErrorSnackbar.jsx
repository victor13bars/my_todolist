import React from 'react';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {setAppError} from "./store/reducers/AuthSlice";

const Alert = React.forwardRef(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {

    const error = useAppSelector(state => state.auth.error)
    const dispatch = useAppDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError(null))
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
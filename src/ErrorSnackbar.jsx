import React from 'react';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useAppDispatch} from "./state/store";
import {setAppErrorAC} from "./state/app-reducer";

const Alert = React.forwardRef(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {

    const error = useTypedSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
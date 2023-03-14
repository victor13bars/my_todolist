import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Login} from "./Login";
import {TodolistsList} from './TodolistsList';
import {initializeApp, logout} from "./store/reducers/AuthSlice";

const AppWithRedux: React.FC = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector(state => state.auth.isInitialized)
    const status = useAppSelector(state => state.auth.status)
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<TodolistsList/>}/>
                        <Route path='/login' element={<Login/>}/>

                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to='/404'/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    )
}
export default AppWithRedux;


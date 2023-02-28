import React, {useEffect} from 'react';
import './App.css';
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {redux} from "./hooks/redux";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Login} from "./Login";
import {TodolistsList} from './TodolistsList';
import {useAppDispatch} from "./store/store";
import {initializeAppTC, logoutTC} from "./store/auth-reducer";

const AppWithRedux: React.FC = () => {

    const isLoggedIn = redux(state => state.auth.isLoggedIn)
    const isInitialized = redux(state => state.auth.isInitialized)
    const status = redux(state => state.app.status)
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
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


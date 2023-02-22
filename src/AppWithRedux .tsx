import React from 'react';
import './App.css';
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Login} from "./Login";
import {TodolistsList} from './TodolistsList';

const AppWithRedux: React.FC = () => {

    const status = useTypedSelector(state => state.app.status)

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
                    <Button color="inherit">Login</Button>
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


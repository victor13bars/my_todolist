import React from 'react';
import './App.css';

import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "./TodolistsList";
import {useTypedSelector} from "./hooks/useTypedSelector";

const AppWithRedux: React.FC = () => {

    const status = useTypedSelector(state => state.app.status)

    return (
        <div className="App">
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
                <TodolistsList/>
            </Container>
        </div>
    );
};
export default AppWithRedux;



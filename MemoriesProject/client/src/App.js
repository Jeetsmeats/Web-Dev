import React from 'react';

// material ui components
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';

// images
import { memories } from './images/memories.png';
const App = () => {
    
    return (
        <Container maxwidth='lg'>
            <AppBar position='static' color="inherit">
                <Typography variant="h2" align="center">Memories</Typography>
                <img src={memories} alt="memories" height="60"/>
            </AppBar>
        </Container>
    )
}

export default App;
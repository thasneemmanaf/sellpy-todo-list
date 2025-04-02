import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TodoLists } from './todos/components/TodoLists';

const MainAppBar = () => {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          Things to do
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const mainWrapperStyle = { display: 'flex', flexDirection: 'column' };
const centerContentWrapper = { display: 'flex', justifyContent: 'center' };
const contentWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
};

const MainWrapper = ({ children }) => {
  return (
    <div style={mainWrapperStyle}>
      <MainAppBar />
      <div style={centerContentWrapper}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainWrapper>
        <TodoLists style={{ margin: '1rem' }} />
      </MainWrapper>
    </LocalizationProvider>
  );
};

export default App;
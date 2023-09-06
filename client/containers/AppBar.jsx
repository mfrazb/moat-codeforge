import * as React from 'react';
import { styled } from '@mui/material/styles';

// MUI components
import { AppBar } from '@mui/material';

// TO DO - move CSS Styling to AppBar.css ?
// TO DO - 

const AppBarCF = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBarCF;

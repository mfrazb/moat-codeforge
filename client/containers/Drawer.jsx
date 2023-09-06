import * as React from 'react';
import { styled } from '@mui/material/styles';

// MUI components
import { Drawer } from '@mui/material';

const DrawerCF = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open, drawerWidth }) => ({
  '& .muiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: `${drawerWidth}px`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: 0,
      },
    }),
  },
}));

export default DrawerCF;

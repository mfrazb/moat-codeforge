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

// SELECT CATEGORY - set posts to new category
// TO DO - rename to selectCategory?
const newPage = page => {
  if (page === curPage) return;
  dispatch(RENDER_TEST());
  dispatch(SET_PAGE(page));
};

// LOGOUT -  redirect to login page
// TO DO - address sessions in handler
const handleLogout = () => {
  navigate('/');
};

export default DrawerCF;

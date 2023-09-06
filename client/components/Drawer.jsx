import React from 'react';
import { styled } from '@mui/material/styles';

// MUI components
import {
  Drawer,
  Toolbar,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// MUI icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ConstructionIcon from '@mui/icons-material/Construction';
import GridOnIcon from '@mui/icons-material/GridOn';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import LogoutIcon from '@mui/icons-material/Logout';
import FunctionsIcon from '@mui/icons-material/Functions';

const DrawerCF = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'drawerOpen',
})(({ theme, drawerOpen, drawerWidth }) => ({
  '& .muiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: `${drawerWidth}px`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!drawerOpen && {
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

// export default function DrawerUsage(props) {
//   const {
//     drawerOpen,
//     drawerWidth,
//     curUser,
//     curPage,
//     toggleDrawer,
//     newPage,
//     handleLogout,
//   } = props;

//   return (
//     <Drawer variant='permanent' open={drawerOpen} drawerWidth={drawerWidth}>
//       <Toolbar
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//           px: [1],
//         }}>
//         <IconButton onClick={toggleDrawer}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Toolbar>
//       <Divider />
//       <Typography component='h1' variant='h3' textAlign='center' sx={{ mt: 5 }}>
//         {`Welcome`}
//       </Typography>
//       <Typography component='h1' variant='h3' textAlign='center'>
//         {`${curUser.name}`}
//       </Typography>
//       <List
//         component='nav'
//         sx={{
//           pl: 4,
//           mt: 5,
//           height: 1,
//           justifyContent: 'start',
//           display: 'flex',
//           flexDirection: 'column',
//         }}>
//         <ListItemButton
//           onClick={() => newPage('Algorithms')}
//           sx={{ maxHeight: 75 }}>
//           <ListItemIcon>
//             <FunctionsIcon />
//           </ListItemIcon>
//           <ListItemText primary='Algorithms' />
//         </ListItemButton>
//         <ListItemButton onClick={() => newPage('React')} sx={{ maxHeight: 75 }}>
//           <ListItemIcon>
//             <FilterVintageIcon />
//           </ListItemIcon>
//           <ListItemText primary='React' />
//         </ListItemButton>
//         <ListItemButton onClick={() => newPage('Redux')} sx={{ maxHeight: 75 }}>
//           <ListItemIcon>
//             <GridOnIcon />
//           </ListItemIcon>
//           <ListItemText primary='Redux' />
//         </ListItemButton>
//         <ListItemButton sx={{ maxHeight: 75 }}>
//           <ListItemIcon>
//             <ConstructionIcon />
//           </ListItemIcon>
//           <ListItemText primary='More to come...' />
//         </ListItemButton>
//         <ListItemButton sx={{ maxHeight: 75, marginTop: 'auto' }}>
//           <ListItemIcon>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary='Log Out' onClick={handleLogout} />
//         </ListItemButton>
//       </List>
//     </Drawer>
//   );
// }

export default DrawerCF;

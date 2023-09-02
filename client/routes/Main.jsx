import * as React from 'react';
import { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FunctionsIcon from '@mui/icons-material/Functions';
import ConstructionIcon from '@mui/icons-material/Construction';
import GridOnIcon from '@mui/icons-material/GridOn';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_FILTER, SET_DEFAULTS, TOGGLE_DRAWER } from '../reducers/forgeReducer';

const main = () => {
  const drawerWidth = 360;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
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
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
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
    }),
  );

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  
  //NEED TO FIX THIS
  let curUser = useSelector(state => state.currentUsername);
  //Add a fake name is there is no currentUser (for some weird reason)
  //if(!curUser) curUser = 'John Doe'
  let curPage = useSelector(state => state.currentPage);
  //Add a fake name is there is no currentUser (for some weird reason)
  //if(!curPage) curPage = 'Algorithms'


  const handleChange = (event) => {
    dispatch(CHANGE_FILTER(event.target.value));
  };

  const filter = useSelector(state => state.filter);

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, ml: 2 }}
            >
              {curUser}
            </Typography>
            <Typography component="h1" variant="h5" sx={{ flexGrow: 1}}>
              {curPage}
            </Typography>
            <Button variant='contained'>Create New Post</Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Typography component='h1' variant='h3' textAlign='center' sx={{ mt: 5 }}>
            {`Welcome`}
          </Typography>
          <Typography component='h1' variant='h3' textAlign='center'>
            {`${curUser}`}
          </Typography>
          <List component="nav" sx={{ pl: 4, mt: 5 }}>
          <ListItemButton>
            <ListItemIcon>
              <FunctionsIcon />
            </ListItemIcon>
            <ListItemText primary="Algorithms" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <FilterVintageIcon />
            </ListItemIcon>
            <ListItemText primary="React" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary="Redux" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ConstructionIcon />
            </ListItemIcon>
            <ListItemText primary="More to come..." />
          </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={'Popular'}
                  value={filter}
                  label="Filter"
                  onChange={handleChange}
                >
                  <MenuItem value={`Popular`}>Popular</MenuItem>
                  <MenuItem value={`Recent`}>Recent</MenuItem>
                  <MenuItem value={`Type`}>Type</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
};
  
/*potential icons - code Rep
  - import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
*/


export default main;
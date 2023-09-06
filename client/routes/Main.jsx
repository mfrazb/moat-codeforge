import * as React from 'react';
import { styled } from '@mui/material/styles';

// use deconstruction to import components from @mui/material
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FunctionsIcon from '@mui/icons-material/Functions';
import ConstructionIcon from '@mui/icons-material/Construction';
import GridOnIcon from '@mui/icons-material/GridOn';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import LogoutIcon from '@mui/icons-material/Logout';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch, useSelector } from 'react-redux';
import {
  CHANGE_FILTER,
  TOGGLE_DRAWER,
  TOGGLE_POST_WINDOW,
  SET_PAGE,
  RENDER_TEST,
} from '../reducers/forgeReducer';
import { useNavigate } from 'react-router-dom';
import PostContainer from '../components/PostContainer';

const main = () => {
  const drawerWidth = 360;

  // make separate component
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
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

  // make separate component
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
  })(({ theme, open }) => ({
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
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get state from store
  const curUser = useSelector(state => state.forge.currentUser);
  const curPage = useSelector(state => state.forge.currentPage);
  const postWindow = useSelector(state => state.forge.newPostWindow);
  const drawerOpen = useSelector(state => state.forge.drawerOpen);
  const curPosts = useSelector(state => state.forge.curPosts);


  const toggleDrawer = () => {
    dispatch(TOGGLE_DRAWER());
  };

  // separate into post component
  const handlePostWindow = () => {
    dispatch(TOGGLE_POST_WINDOW());
  };

  const handleNewPost = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title');
    const description = data.get('description');
    const link = data.get('link');
    const contentType = data.get('content');
    const request = {
      title,
      type: contentType,
      category: curPage,
      userId: curUser.id,
      link,
      description,
    };
    console.log(title, description, link, contentType);
    const serverResponse = await fetch(
      'http://localhost:3000/post/createpost',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      },
    ).catch(err => {
      console.log(err);
    });
    const parsedResponse = await serverResponse.json();
    console.log(parsedResponse);
    dispatch(TOGGLE_POST_WINDOW());
  };
  // const loadPosts = async event => {
  //   const serverResponse = await fetch('http://localhost:3000/post/getposts', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ category: curPage }),
  //   }).catch(err => {
  //     console.log(err);
  //   });
  //   const parsedResponse = await serverResponse.json();
  //   console.log(parsedResponse);
  //   dispatch(RENDER_TEST(parsedResponse));
  // };

  // // load posts when curPage state changes
  // React.useEffect(() => {
  //   loadPosts();
  // }, [curPage]);

  //
  const newPage = page => {
    if (page === curPage) return;
    dispatch(RENDER_TEST());
    dispatch(SET_PAGE(page));
  };

  // navigate back to log in page
  // could address sessions later on
  const handleLogout = () => {
    navigate('/');
  };

  // move to create new post component
  // populates dropdown
  // separate out logic - options file that specifies different filters
  const postType = [
    {
      value: 'article',
      label: 'Article',
    },
    {
      value: 'video',
      label: 'Video',
    },
    {
      value: 'tutorial',
      label: 'Tutorial',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* check HTML - if all one unit, separate to another component */}
      <AppBar position='absolute' open={drawerOpen} color='error'>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(drawerOpen && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h5'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1, ml: 2 }}>
            {curUser.name}
          </Typography>
          <Typography component='h1' variant='h5' sx={{ flexGrow: 1 }}>
            {curPage}
          </Typography>
          <Button variant='contained' onClick={handlePostWindow} color='error'>
            Create New Post
          </Button>
        </Toolbar>
      </AppBar>
      {/* side bar - break into another component */}
      <Drawer variant='permanent' open={drawerOpen}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Typography
          component='h1'
          variant='h3'
          textAlign='center'
          sx={{ mt: 5 }}>
          {`Welcome`}
        </Typography>
        <Typography component='h1' variant='h3' textAlign='center'>
          {`${curUser.name}`}
        </Typography>
        <List
          component='nav'
          sx={{
            pl: 4,
            mt: 5,
            height: 1,
            justifyContent: 'start',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <ListItemButton
            onClick={() => newPage('Algorithms')}
            sx={{ maxHeight: 75 }}>
            <ListItemIcon>
              <FunctionsIcon />
            </ListItemIcon>
            <ListItemText primary='Algorithms' />
          </ListItemButton>
          <ListItemButton
            onClick={() => newPage('React')}
            sx={{ maxHeight: 75 }}>
            <ListItemIcon>
              <FilterVintageIcon />
            </ListItemIcon>
            <ListItemText primary='React' />
          </ListItemButton>
          <ListItemButton
            onClick={() => newPage('Redux')}
            sx={{ maxHeight: 75 }}>
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary='Redux' />
          </ListItemButton>
          <ListItemButton sx={{ maxHeight: 75 }}>
            <ListItemIcon>
              <ConstructionIcon />
            </ListItemIcon>
            <ListItemText primary='More to come...' />
          </ListItemButton>
          <ListItemButton sx={{ maxHeight: 75, marginTop: 'auto' }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Log Out' onClick={handleLogout} />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
        <Container maxWidth='lg' sx={{ mt: 10, mb: 4 }}>
          <Box sx={{ minWidth: 120 }}>
            <div>
              {/* CREATE NEW POST - make dialog into separate component , move state/handler functions as needed */}
              <Dialog open={postWindow} onClose={handlePostWindow}>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter in the following information regarding your new
                    post:
                  </DialogContentText>
                  <Box component='form' onSubmit={handleNewPost}>
                    <TextField
                      autoFocus
                      margin='dense'
                      id='title'
                      name='title'
                      label='Title'
                      type='text'
                      fullWidth
                      required
                      variant='standard'
                    />
                    <TextField
                      autoFocus
                      required
                      margin='dense'
                      id='description'
                      name='description'
                      label='Description'
                      type='text'
                      fullWidth
                      minRows={3}
                      multiline
                      variant='standard'
                    />
                    <TextField
                      autoFocus
                      required
                      margin='dense'
                      id='link'
                      name='link'
                      label='Link'
                      type='url'
                      fullWidth
                      variant='standard'
                    />
                    <TextField
                      autoFocus
                      required
                      margin='dense'
                      id='content'
                      name='content'
                      label='Content Type'
                      type='url'
                      fullWidth
                      defaultValue={'article'}
                      select
                      helperText='Please select the type of content'
                      variant='standard'>
                      {postType.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <DialogActions>
                      <Button onClick={handlePostWindow}>Cancel</Button>
                      <Button type='submit'>Submit Post</Button>
                    </DialogActions>
                  </Box>
                </DialogContent>
              </Dialog>
            </div>
            <PostContainer />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

/*potential icons - code Rep
  - import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
*/

//create post -> get post -> upvotes
export default main;

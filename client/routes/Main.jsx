import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

// TO DO - consider switching legacy mui/styles to mui/system
import { styled } from '@mui/material/styles';

// use deconstruction to import components from @mui/material

// Import containers
import AppBarContainer from '../containers/AppBarContainer.jsx';
// Import components
import AppBar from '../components/AppBar.jsx';
import Drawer from '../containers/DrawerContainer.jsx';

// App Bar subcomponents
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

// shared subcomponents
import Button from '@mui/material/Button';

import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

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

  // REACT HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATE HOOKS
  // MOVE TO DRAWER CONTAINER
  const curUser = useSelector(state => state.forge.currentUser);
  const curPage = useSelector(state => state.forge.currentPage);
  const postWindow = useSelector(state => state.forge.newPostWindow);
  const drawerOpen = useSelector(state => state.forge.drawerOpen);

  // MOVE TO POSTS CONTAINER
  const filter = useSelector(state => state.forge.filter);
  const curPosts = useSelector(state => state.forge.curPosts);

  // HANDLERS

  // open and close CREATE NEW POST window
  const handlePostWindow = () => {
    dispatch(TOGGLE_POST_WINDOW());
  };

  // open and close left drawer
  const toggleDrawer = () => {
    dispatch(TOGGLE_DRAWER());
  };

  // separate into post component
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
  // MOVED TO DRAWER
  const newPage = page => {
    if (page === curPage) return;
    dispatch(RENDER_TEST());
    dispatch(SET_PAGE(page));
  };

  // MOVED TO DRAWER
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
      <AppBarContainer
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        curPage={curPage}
        curUser={curUser}
        toggleDrawer={toggleDrawer}
        handlePostWindow={handlePostWindow}
      />
      {/* side bar - break into another component */}
      <Drawer variant='permanent' open={drawerOpen} drawerWidth={drawerWidth}>
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
              {/* CREATE NEW POST - make dialog into separate component , move state/handler functions as needed, need to allow user to not add https AND to specify category */}
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

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

// TO DO - consider switching legacy mui/styles to mui/system
import { styled } from '@mui/material/styles';

// use deconstruction to import components from @mui/material

// Import containers
import AppBarContainer from '../containers/AppBarContainer.jsx';
import DrawerContainer from '../containers/DrawerContainer.jsx';

// Import components
import Drawer from '../components/Drawer.jsx';
import PostCreator from '../components/PostCreator.jsx';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// shared subcomponents
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// import MuiDrawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// drawer subcomponents
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ConstructionIcon from '@mui/icons-material/Construction';
import GridOnIcon from '@mui/icons-material/GridOn';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import LogoutIcon from '@mui/icons-material/Logout';
import FunctionsIcon from '@mui/icons-material/Functions';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

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
  const drawerOpen = useSelector(state => state.forge.drawerOpen);

  // MOVE TO POSTS CONTAINER
  const filter = useSelector(state => state.forge.filter);
  const curPosts = useSelector(state => state.forge.curPosts);

  // MOVE TO APPBAR CONTAINER?
  const postWindow = useSelector(state => state.forge.newPostWindow);

  // HANDLERS

  // MOVE TO APPBAR CONTAINER ?
  // open and close CREATE NEW POST window
  const handlePostWindow = () => {
    dispatch(TOGGLE_POST_WINDOW());
  };

  // MOVE TO DRAWER CONTAINER
  // open and close left drawer
  const toggleDrawer = () => {
    dispatch(TOGGLE_DRAWER());
  };

  // MOVE TO DRAWER CONTAINER
  const newPage = page => {
    if (page === curPage) return;
    dispatch(RENDER_TEST());
    dispatch(SET_PAGE(page));
  };

  // MOVED TO DRAWER CONTAINER
  const handleLogout = () => {
    navigate('/');
  };

  // MOVE TO POST CONTAINER
  const handleChange = event => {
    dispatch(CHANGE_FILTER(event.target.value));
  };

  // MOVE TO POST CREATOR ?
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
    console.log(title, contentType, curPage, curUser.id, description, link);
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

  // move to create new post component
  // populates dropdown
  // separate out logic - options file that specifies different filters

  // MOVE TO POSTCREATOR
  // const postType = [
  //   {
  //     value: 'article',
  //     label: 'Article',
  //   },
  //   {
  //     value: 'video',
  //     label: 'Video',
  //   },
  //   {
  //     value: 'tutorial',
  //     label: 'Tutorial',
  //   },
  // ];

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
      {/*}
      <Drawer
        drawerOpen={drawerOpen} //
        drawerWidth={drawerWidth} //
        curUser={curUser}
        curPage={curPage}
        toggleDrawer={toggleDrawer}
        newPage={newPage}
        handleLogout={handleLogout}
      />
      */}
      <Drawer
        variant='permanent'
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}>
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
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Filter</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue={'Popular'}
                value={filter}
                label='Filter'
                onChange={handleChange}>
                {/* currently filters are hard-coded in and not dependent on state - populate filters with state instead */}
                <MenuItem value={`Popular`}>Popular</MenuItem>
                <MenuItem value={`Recent`}>Recent</MenuItem>
                <MenuItem value={`Type`}>Type</MenuItem>
              </Select>
            </FormControl>
            <PostCreator
              postWindow={postWindow}
              handlePostWindow={handlePostWindow}
              handleNewPost={handleNewPost}
            />
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

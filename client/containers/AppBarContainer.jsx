import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../components/AppBar.jsx';

const AppBarContainer = props => {
  const {
    drawerOpen,
    drawerWidth,
    curPage,
    curUser,
    toggleDrawer,
    handlePostWindow,
  } = props;

  // STATE HOOKS
  // const postWindow = useSelector(state => state.forge.newPostWindow);

  // const dispatch = useDispatch();

  // HANDLERS
  // open and close CREATE NEW POST window
  // const handlePostWindow = () => {
  //   dispatch(TOGGLE_POST_WINDOW());
  // };

  // open and close left drawer
  // const toggleDrawer = () => {
  //   dispatch(TOGGLE_DRAWER());
  // };

  return (
    <div>
      <AppBar
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        curPage={curPage}
        curUser={curUser}
        handlePostWindow={handlePostWindow}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

export default AppBarContainer;

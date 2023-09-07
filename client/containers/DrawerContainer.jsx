import React from 'react';

// REACT HOOKS
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Drawer from '../components/Drawer.jsx';

const DrawerContainer = props => {
  const {
    drawerOpen,
    drawerWidth,
    curPage,
    curUser,
    toggleDrawer,
    newPage,
    handleLogout,
  } = props;

  // STATE HOOKS
  // const drawerOpen = useSelector(state => state.forge.drawerOpen);
  // const curUser = useSelector(state => state.forge.currentUser);
  // const curPage = useSelector(state => state.forge.currentPage);
  // const dispatch = useDispatch();

  // HANDLERS

  // OPEN/CLOSE SIDEBAR
  // const toggleDrawer = () => {
  //   dispatch(TOGGLE_DRAWER());
  // };

  // SELECT CATEGORY - set posts to new category
  // TO DO - rename to selectCategory?
  // const newPage = page => {
  //   if (page === curPage) return;
  //   dispatch(RENDER_TEST());
  //   dispatch(SET_PAGE(page));
  // };

  // LOGOUT -  redirect to login page
  // TO DO - address sessions in handler
  // const handleLogout = () => {
  //   navigate('/');
  // };

  return (
    <div>
      <Drawer
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        curPage={curPage}
        curUser={curUser}
        newPage={newPage}
        handleLogout={handleLogout}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

export default DrawerContainer;

//codeRep
//number of upvotes/downvotes given from profile
//profilePic?

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userList: [], //this will hold all users (each one will be an object)
    pages: [//this will be all the pages i.e Algos, Express, etc (each one will be an object) page = { posts: [{title: '', desc: '', poster: ''}, {}]}
      {title: 'Algos', posts: []}, 
      {title: 'React', posts: []}
    ], 
    //add more tabs at a later point as necessary
    currentPosts: [{
      title: 'Algos', 
      content_Type: 'Article', 
      poster: 'username',
      link: 'url',
      description: 'insert description here',
      date: 0,//date goes here,
      upvotes: 0  
    }],
    drawerOpen: true,
    filter: '',
    loggedIn: false,
    currentUsername: 'John Doe',
    currentPage: 'Algorithms',
};

//possibly move logic into database//for right now, creating array of objects specific to each topic
//database: table for each tab ----| posts based on each topic


//add actions (logistics) for each reducer method
//inside each action, modify the portion of state that needs to be edited and return the state


//logic for individual profiles initial state?

export const forgeSlice = createSlice({
  name: 'forge',
  initialState,
  reducers: {
    CHANGE_FILTER: (state, action) => {//updates filter string to coordinate further organizing reducer
      let newFilter = action.payload;
      return {...state, newFilter};
    },
    RENDER_POSTS: (state, action) => {//switch/case /fetch-> get array of objects -> use dispatcher to go through posts
      //const 
      //assume that action.payload is going to be an array of objects
      //each object will have all of the properties of each post
      //we will do the fetch request BEFORE calling the dispatcher, so we will have all the post info already
      /*
      const resp = 'popular' {
        switch(resp) {
          case 'Recent': console.log(Math.min(date)) //arrange results in order based off least greatest accumulated time
            case 'Type': //database: ---| unit ---| type
              console.log(action.type(?))
            case 'Popular': console.log() //arrange results in order based off highest number of upvotes (Math.max?)
        }
      }
      */
    },
    TOGGLE_DRAWER: (state, action) => {
      const curState = state.drawerOpen;
      state.drawerOpen = !curState;
      return state;
    },
    CREATE_POST: (state, action) => {
      //type the function here
      return state;
    },
    DELETE_POST: (state, action) => {
      return state;
    },
    //LOAD_POST
    //EDIT_POST
    ADD_PROFILE: (state, action) => {
      return state;
    },
    DELETE_PROFILE: (state, action) => {
      return state;
    },
    default: () => {return state}
    //UPDATE_PROFILE
  }
})



//backend sends array of posts broken down by topic, then iterate through each topic array to find correct post

export const {CHANGE_FILTER, TOGGLE_DRAWER, SET_DEFAULTS} = forgeSlice.actions;

export default forgeSlice.reducer;
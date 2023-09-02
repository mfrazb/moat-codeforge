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
      date: new Date(),
      upvotes: 0  
    } ]
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
    CREATE_POST: (state, action) => {
      //type the function here
      state
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
    }
    //UPDATE_PROFILE
  }
})



//backend sends array of posts broken down by topic, then iterate through each topic array to find correct post

export const {CREATE_POST} = forgeSlice.actions;

export default forgeSlice.reducer;
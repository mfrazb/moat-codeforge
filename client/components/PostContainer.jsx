import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {RENDER_TEST} from '../reducers/forgeReducer';

const PostContainer = () =>{
    const dispatch = useDispatch();
    // Pull State of Page into post container
    const curPage = useSelector(state => state.forge.currentPage);
    const Posts = useSelector(state => state.forge.curPosts);
    // Fetch post data from database // old with post request...
    const getPostData = async () => {
        const serverResponse = await fetch('http://localhost:3000/post/getposts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: curPage }),
        }).catch(err => {
          console.log(err);
        });
        const parsedResponse = await serverResponse.json();
        console.log(parsedResponse);
        // 
        dispatch(RENDER_TEST(parsedResponse));
      };
      // Leaving this commented for when get request is there
    //   const getPostData = async () => {
    //     const serverResponse = await fetch('http://localhost:3000/post/getposts').catch(err => {
    //       console.log(err);
    //     });
    //     const parsedResponse = await serverResponse.json().filter((post) => post.content_type === curPage);
    //     console.log(parsedResponse);
    //     dispatch(RENDER_TEST(parsedResponse));
    //   };
      // load posts when curPage state changes
      React.useEffect(() => {
        getPostData();
      }, [curPage]);
    




    console.log('These are the Posts: ', Posts)

    return (
        <Box >
            <Typography >Test</Typography>
        </Box>
    )
}

export default PostContainer;


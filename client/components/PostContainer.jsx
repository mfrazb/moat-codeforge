import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { RENDER_TEST, CHANGE_FILTER } from "../reducers/forgeReducer";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const PostContainer = () => {
  const dispatch = useDispatch();
  // Pull State of Page into post container
  const curPage = useSelector((state) => state.forge.currentPage);
  const Posts = useSelector((state) => state.forge.curPosts);
  const filter = useSelector((state) => state.forge.filter);
  const handleChange = (event) => {
    dispatch(CHANGE_FILTER(event.target.value));
  };
  const getPostData = async () => {
    const serverResponse = await fetch(
      "http://localhost:3000/post/getposts"
    ).catch((err) => {
      console.log(err);
    });
    const parsedResponse = await serverResponse.json();
    const filteredResponse = parsedResponse.filter((post) => post.category === curPage);
    filteredResponse.sort((a, b) => {
      if (filter === "Popular") {
        return b.upvotes - a.upvotes;
      } else if (filter === "Recent") {
        return b.date_submitted - a.date_submitted;
      } else {
        if (a.type[0] < b.type[0]) {
          return -1;
        }
        if (a.type[0] > b.type[0]) {
          return 1;
        }
        return 0;
      }
    });
    dispatch(RENDER_TEST(filteredResponse));
  };
  const handleThumbsUp = async (event) => {
    console.log(event.target.value)
    const serverResponse = await fetch(
      'http://localhost:3000/post/vote',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({vote: 'up', link: event.target.value}),
      },
    ).catch(err => {
      console.log(err);
    });
    getPostData();
  };
  const handleThumbsDown = async (event) => {
    console.log(event.target.value)
    const serverResponse = await fetch(
      'http://localhost:3000/post/vote',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({vote: 'down', link: event.target.value}),
      },
    ).catch(err => {
      console.log(err);
    });
    getPostData();
  };







  React.useEffect(() => {
    getPostData();
  }, [curPage, filter]);

  const postArr = [];
  Posts.forEach((post, index) => {
    let date = new Date(post.date_submitted);
    postArr.push(
      <div key={index} style={{ border: "1px solid black", padding: "5px", display: 'flex', flexDirection: 'column' }}>
        <strong>{post.title}</strong>
        <label>User {post.user_id} posted this on {date.toUTCString()}</label>
        <p>{post.description}</p>
        <br></br>
        <a href={post.link}>Link: {`${post.link}`}</a>
        <br></br>
        <div style={{display:'flex', flexDirection: 'column', alignSelf:'center'}}>
        <label>{post.upvotes} people upvoted this. </label>
        <Button variant="outlined" value={post.link} startIcon={<ThumbUpOutlinedIcon />} style={{border:'1px solid red', color:'red', width:'200px'}} onClick={handleThumbsUp}>Upvote This!</Button>
        <Button variant="outlined" value={post.link} startIcon={<ThumbDownOffAltIcon />} style={{border:'1px solid red', color:'red' , width:'200px'}} onClick={handleThumbsDown}>Downvote This!</Button> 
        </div>
    
      </div>
    );
  });

  return (
    <Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={"Popular"}
            value={filter}
            label="Filter"
            onChange={handleChange}
          >
            {/* currently filters are hard-coded in and not dependent on state - populate filters with state instead */}
            <MenuItem value={`Popular`}>Popular</MenuItem>
            <MenuItem value={`Recent`}>Recent</MenuItem>
            <MenuItem value={`Type`}>Type</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {postArr}
    </Box>
  );
};

export default PostContainer;

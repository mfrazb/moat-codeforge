import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { RENDER_TEST, CHANGE_FILTER } from "../reducers/forgeReducer";

const PostContainer = () => {
  const dispatch = useDispatch();
  // Pull State of Page into post container
  const curPage = useSelector((state) => state.forge.currentPage);
  const Posts = useSelector((state) => state.forge.curPosts);
  const filter = useSelector((state) => state.forge.filter);
  const handleChange = (event) => {
    dispatch(CHANGE_FILTER(event.target.value));
  };
  // Fetch post data from database // old with post request...
  const getPostData = async () => {
    const serverResponse = await fetch("http://localhost:3000/post/getposts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: curPage }),
    }).catch((err) => {
      console.log(err);
    });
    const parsedResponse = await serverResponse.json();
    parsedResponse.sort((a,b) => {
      if (filter === 'Popular'){
        return (b.upvotes - a.upvotes)
    }
    else if (filter === 'Recent')    {
        return (b.date_submitted - a.date_submitted)
    }
    else {
      if(a.type[0] < b.type[0]) { return -1; }
      if(a.type[0] > b.type[0]) { return 1; }
      return 0;
    }
    })
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


  // filter change sorts array of posts
//

//     // if filter is popular, sort by upvotes


React.useEffect(() => {
  getPostData();
}, [curPage, filter]);
console.log("These are the Posts: ", Posts);
console.log("This is the filter: ", filter)
  const postArr = [];
  Posts.forEach((post, index) => {
    postArr.push(
      <div key={index} style={{ border: "1px solid black", padding: "5px" }}>
        {/* currently looking at user_id, may have to fetch which user created which post usign a get request */}
        <label>Created by: </label>
        <p>{post.user_id}</p>
        <br></br>
        <strong>{post.title}</strong>
        <br></br>
        <p>{post.description}</p>
        <br></br>
        <a href={post.link}>Link</a>
        <br></br>
        <label>Made at: </label>
        <p>{post.date_submitted}</p>
        <label>Upvotes: </label>
        <p>{post.upvotes}</p>
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

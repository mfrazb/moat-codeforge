import * as React from 'react';
import { styled } from '@mui/material/styles';

// MUI COMPONENTS
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const PostCreator = props => {
  const { postWindow, handlePostWindow, handleNewPost } = props;

  // TO DO: move post types to misc folder
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
    <div>
      <Dialog open={postWindow} onClose={handlePostWindow}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter in the following information regarding your new post:
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
  );
};

export default PostCreator;

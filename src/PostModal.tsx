import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

interface Post {
    id: any;
    userId: number;
    title: string;
    body: string;
  }

  
interface PostModalProps {
  post: Post; // Use the Post interface as the type for the post prop
}

export const PostModal: React.FC<PostModalProps> = ({ post }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{post.title}</DialogTitle>
        <DialogContent>
          <p>ID: {post.id}</p>
          <p>Body: {post.body}</p>
          <Button onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostModal;

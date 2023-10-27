import { useMediaQuery, Theme, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, Resource, Button } from "react-admin";
import MyUrlField from './MyUrlField';
import React, { useState } from "react";
import { User } from "./customInterfaces";




export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [selectedPost, setSelectedPost] = React.useState<User | null>(null);
    const [editMode, setEditMode] = useState    (false);
    const [editedPost, setEditedPost] = useState<User | null>(null);



    const openModal = (post: User) => {
        setSelectedPost(post);
        setModalOpen(true);
      };
    
    const closeModal = () => {
        setSelectedPost(null);
        setModalOpen(false);
      };


    const toggleEditMode = () => {
        setEditMode(!editMode);
      };

    


    return (
    <div>
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick={(id, resource, record: any) => openModal(record)}>
                        <TextField source="id" />
                        <TextField source="name" />
                        <EmailField source="email" />
                        <TextField source="phone" />
                        <MyUrlField source="website" />
                        <TextField source="company.name" />
                </Datagrid>
            )}
        </List>
        
        <Dialog fullWidth open={isModalOpen} onClose={closeModal}>
        {selectedPost && (
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <DialogContent>
              <DialogTitle>
                ID:
                <span className="modaltitleuser">{selectedPost.id}</span>
              </DialogTitle>
              <DialogTitle>
                Name:
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={selectedPost.name}
                  />
                ) : (
                  <span className="non-editable">{selectedPost.name}</span>
                )}
              </DialogTitle>
              <DialogTitle>
                Email:
                <span className="modaltitleuser">{selectedPost.email}</span>
              </DialogTitle>
              <DialogTitle>
                Phone:
                <span className="modaltitleuser">{selectedPost.phone}</span>
              </DialogTitle>
              <DialogTitle>
                Website:
                <span className="modaltitleuser">{selectedPost.website}</span>
              </DialogTitle>
              <DialogTitle>
                Company name:
                <span className="modaltitleuser">{selectedPost.company.name}</span>
              </DialogTitle>
            </DialogContent>
            <Button label="Edit" onClick={toggleEditMode} />
            <Button label="Close" onClick={closeModal} />
          </div>
        )}
      </Dialog>
    </div>
    );
};


import React, { useState, useEffect } from "react";
import { useMediaQuery, Theme, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, Button } from "react-admin";
import MyUrlField from './MyUrlField';
import { User } from "./customInterfaces";
import "../styles/modal.css";
import axios from "axios"; // Import the axios library

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [selectedPost, setSelectedPost] = React.useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editedPost, setEditedPost] = useState<User | null>(null);
    const [isEditButtonVisible, setEditButtonVisible] = useState(true);

    const openModal = (post: User) => {
        setSelectedPost(post);
        setModalOpen(true);
    };

        const closeModal = () => {
            setSelectedPost(null);
            setModalOpen(false);
            setEditMode(false); // Reset editMode
            setEditButtonVisible(true);
        };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setEditButtonVisible(!editMode);
        // Initialize editedPost with the selectedPost data when entering edit mode
        if (editMode) {
            setEditedPost(null);
        } else {
            setEditedPost(selectedPost);
        }
    };

    // Function to handle changes in the "Name" field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (editedPost) {
            setEditedPost({
                ...editedPost,
                [name]: value,
            });
        }
    };
    

    // Function to save the changes by sending a PUT request
   // ...

    // Function to save the changes by sending a PUT request
    const saveChanges = async () => {
        if (editedPost) {   
            try {
                // Send a PUT request to update user data
                console.log("editedPost in saveChanges", editedPost)
                const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editedPost.id}`, editedPost);

                if (response.status === 200) {
                    // Successfully updated user data
                    console.log('API Response:', response);
                    // Update the UI as needed
                    setEditMode(false);
                    setEditedPost(null);
                    // You may want to display a success message here
                } else {
                    // Handle errors
                    console.error('Error updating user data.');
                    // You may want to display an error message here
                }
            } catch (error) {
                console.error('Error updating user data:', error);
                // You may want to display an error message here
            }
        }
    };

// ...



    console.log('editedPost:', editedPost);



    useEffect(() => {
        setEditButtonVisible(true); // Ensure the "Edit" button is initially visible
    }, []);

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
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                       <DialogContent>
                        <DialogTitle>
                            ID: <span className="modaltitleuser">{selectedPost.id}</span>
                        </DialogTitle>
                        <DialogTitle>
                            <form>
                                <label htmlFor="name">Name:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={editedPost?.name || ''}
                                        onChange={handleChange}
                                        className="custom-input modaltitleuser"
                                    />
                                ) : (
                                    <span className="modaltitleuser">{selectedPost.name}</span>
                                )}
                            </form>     
                        </DialogTitle>
                        <DialogTitle>
                            <form>
                                <label htmlFor="email">Email:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={editedPost?.email || ''}
                                        onChange={handleChange}
                                        className="custom-input modaltitleuser"
                                    />
                                    ) : (
                                        <span className="modaltitleuser">{selectedPost.email}</span>
                                )}
                            </form>
                        </DialogTitle>
                        <DialogTitle>
                            <form>
                                <label htmlFor="phone">Phone:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={editedPost?.phone || ''}
                                        onChange={handleChange}
                                        className="custom-input modaltitleuser"
                                    />
                                ) : (
                                    <span className="modaltitleuser">{selectedPost.phone}</span>
                                )}
                            </form>
                        </DialogTitle>      
                        <DialogTitle>
                            <form>
                                <label htmlFor="website">Website:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        value={editedPost?.website || ''}
                                        onChange={handleChange}
                                        className="custom-input modaltitleuser"
                                    />
                                ) : (
                                    <span className="modaltitleuser">{selectedPost.website}</span>
                                )}
                            </form>
                        </DialogTitle>
                        <DialogTitle>
                            <form>
                                <label htmlFor="companyName">Company name:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        value={editedPost?.company.name || ''}
                                        onChange={handleChange}
                                        className="custom-input modaltitleuser"
                                    />
                                ) : (
                                    <span className="modaltitleuser">{selectedPost.company.name}</span>
                                )}
                            </form>
                        </DialogTitle>
                    </DialogContent>
                    {isEditButtonVisible ? (
                <div className="button-container">
                    {editMode && (
                        <div>
                            <Button label="Save" onClick={saveChanges} />
                            <Button label="Reset" onClick={() => setEditedPost(selectedPost)} />
                            <Button label="Cancel" onClick={() => setEditMode(false)} />
                        </div>
                    )}
                    {!editMode && (
                        <div>
                            <Button label="Edit" onClick={toggleEditMode} />
                        </div>
                    )}
                </div>
            ) : null}
                    </div>
                )}
            </Dialog>
        </div>
    );
};

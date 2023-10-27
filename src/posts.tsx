// in src/posts.tsx
import { createWriteStream } from "node:fs";
import { it } from "node:test";
import {
  List,
  Datagrid,
  useRecordContext,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  SimpleForm,
  ReferenceInput,
  TextInput,
  TabbedForm,
  Create,
  DateInput,
  NumberInput,
  BooleanInput,
  Button,
  Identifier
} from "react-admin";
import * as React from 'react';
import { Dialog, DialogContent, DialogTitle, ListProps } from "@mui/material";
import { useEffect } from 'react';
import { Post } from "./customInterfaces";
import "../styles/modal.css"


export const PostList: React.FC<ListProps> = (props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [userName, setUserName] = React.useState<string | null>(null);

  useEffect(() => {
    if (selectedPost) {
      // Fetch user data based on userId
      fetchUserById(selectedPost.userId)
        .then((user) => {
          setUserName(user.name);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    }
  }, [selectedPost]);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  return (
    <div>
      <List>
        <Datagrid  rowClick={(id, resource, record) => openModal({
        id,
        userId: record.userId,
        title: record.title,
        body: record.body,
      })} >
          <TextField source="id" />
          <ReferenceField source="userId" reference="users" link="show">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="title" />
          <TextField source="body" />
          <EditButton />
        </Datagrid>
      </List>

      <Dialog fullWidth open={isModalOpen} onClose={closeModal}>
        {selectedPost && userName && (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <DialogContent>
              <DialogTitle>ID:  <span className="modaltitlepost">{selectedPost.id}</span></DialogTitle>
              <DialogTitle>Name: <span className="modaltitlepost">{userName}</span></DialogTitle>
              <DialogTitle>Title: <span className="modaltitlepost">{selectedPost.title}</span></DialogTitle>
              <DialogTitle>Body: <span className="modaltitlepost">{selectedPost.body}</span></DialogTitle>
            </DialogContent>
            <Button label="Close" onClick={closeModal} />
          </div>
        )}
      </Dialog>
    </div>
  );
};

// Function to fetch user data by userId
async function fetchUserById(userId: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    throw error;
  }
}

const inputArrayType: {
  tab: string;
  items: {
    inputType: string;
    key: string;
    label: string;
    value?: boolean;
  }[];
}[] = [
    {
      tab: 'Update',
      items: [
        {
          inputType: 'string',
          key: 'id',
          value: false,
          label: 'id',
        },
        {
          inputType: 'string',
          key: 'title',
          value: false,
          label: 'title',
        },
        {
          inputType: 'string',
          key: 'body',
          value: false,
          label: 'body',
        },
      ],
    },
    {
      tab: 'Tab2',
      items: [
        {
          inputType: 'number',
          key: 'quantity',
          value: false,
          label: 'NumberInputs',
        },
      ],
    },
    {
      tab: 'Tab3',
      items: [
        {
          inputType: 'DateInput',
          key: 'isActive',
          value: false,
          label: 'DateInput',
        },
        {
          inputType: 'Boolean',
          key: 'qua',
          value: false,
          label: 'BooleanInput',
        },
      ],
    },
  ];


function RenderInputComponents(tabIndex: number) {
  const items = inputArrayType[tabIndex].items;
  console.log("itemsdsdsdssssss", items)

  return (
    <div>
      {items.map((item, itemIndex) => {
        const { inputType, key, label } = item;
        console.log('item', item);
        switch (inputType) {
          case 'DateInput':
            return (
              <div key={itemIndex}>
                <DateInput key={key} label={label} source={key} />
              </div>
            );
          case 'number':
            return (
              <div key={itemIndex}>
                <NumberInput key={key} label={label} source={key} />
              </div>
            );
          case 'string':
            return (
              <div key={itemIndex}>
                <TextInput key={key} label={label} source={key} />
              </div>
            );
          case 'Boolean':
            return (
              <div key={itemIndex}>
                <BooleanInput label="Commentable" source={key} />
              </div>
            );
            return null; // or handle the case for other input types as needed
        }
      })}
    </div>
  );
}

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};


export const PostEdit: React.FC = () => (
  <Edit title={<PostTitle />}>
    <TabbedForm>
      {inputArrayType.map((tabItem, index) => (
        <TabbedForm.Tab label={tabItem.tab} key={index}>
          {RenderInputComponents(index)}
        </TabbedForm.Tab>
      ))}
    </TabbedForm>
  </Edit>
);


const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="User" reference="users" />,
];


export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Create>
);

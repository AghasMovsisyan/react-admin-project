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
  required,
  DateInput,
  NumberInput,
  BooleanInput,
  ReferenceManyField,
  DateField,
  number,
  minValue,
  ImageField,
  ImageInput,
  CheckboxGroupInput,
  SelectInput,
  PasswordInput
} from "react-admin";
import * as React from 'react';


export const PostList: React.FC = () => {
  return (
    <div>
      <List filters={postFilters} >
        <Datagrid rowClick="show">
          <TextField source="id" />
          <ReferenceField source="userId" reference="users" link="show" />
          <TextField source="title" />
          <TextField source="body" />
          <EditButton />
        </Datagrid>
      </List>

    </div>
  );
};


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
  console.log("itemsdsdsdssssss",items)

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
          default:
            return null; // or handle the case for other input types as needed
        }
      })}
    </div>
  );
}


export const PostEdit: React.FC = () => (
  <Edit>
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



const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};









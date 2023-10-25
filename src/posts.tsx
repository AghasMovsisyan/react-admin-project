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

export const PostList = () => (
  <List filters={postFilters}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="userId" reference="users" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);




function Creates () {

   return  <div> 
                <div><TextInput label="User" source="User" /></div>
                <div><PasswordInput source="Passwords" /></div>
                <div><CheckboxGroupInput source="roles" choices={[
                    { id: 'admin', name: 'Admin' },
                    { id: 'u001', name: 'Editor' },
                    { id: 'u002', name: 'Moderator' },
                    { id: 'u003', name: 'Reviewer' },
                ]} />
                </div>
              </div>
}
// function RenderInputComponents() {
//   return (
  //       {array.map((item) => {
    //         const { inputType, key, value, label} = item;
    //         console.log("item",item)
    //         if(inputType === "DateInput"){
      //           return <div><DateInput key={key} label={label} source={key}/></div>
      //     <div>
//         }
//         else if (inputType === "number"){
//           return <div><NumberInput key={key} label={label} source={key}/></div>
//         }
//         else if (inputType === "string") {
//           return <div><TextInput key={key} label={label} source={key}/></div>
//         }
       
//       })}
//     </div>
// }

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
    tab: 'Tab1',
    items: [
      {
        inputType: 'string',
        key: 'isAvailable',
        value: false,
        label: 'TextInputs',
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









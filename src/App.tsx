import * as React from 'react';
import { Admin, Layout, Resource, ShowGuesser, ToggleThemeButton } from "react-admin";
import { dataProvider } from './dataProvider';
import { UserList } from "./users";
import { Dashboard } from './Dashboard';
import { authProvider } from "./authProvider";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
;
import { PostCreate, PostEdit, PostList } from './posts';
import { CustomShowGuesser } from './showguesser';
import { MyAppBar } from './MyAppBar';

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;


export const App = () => (
  <Admin  authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} layout={MyLayout} darkTheme={{ palette: { mode: 'dark' } }}>
    <Resource
      name="posts"
      list={PostList}
      show={CustomShowGuesser}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />  
    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      recordRepresentation="name"
      icon={UserIcon}
    />
    {/* Render your SelectButton component */}
  </Admin>
);

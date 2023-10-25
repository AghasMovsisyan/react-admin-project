// // src/views/ItemList.js
// import * as React from 'react';
// import { List, Datagrid, TextField, Button } from 'react-admin';

// export const SelectButton = () => {
//     const [selectedItems, setSelectedItems] = React.useState([]);
  
//     const handleSelect = (item) => {
//       setSelectedItems([...selectedItems, item]);
//     };
  

//   return <Button label="Select" onClick={handleSelect} />;
// };

// const ItemList = (props) => {
//   return (
//     <List {...props}>
//       <Datagrid>
//         <TextField source="id" />
//         <TextField source="name" />
//         {/* Add more fields here */}
//         <SelectButton />
//       </Datagrid>
//     </List>
//   );
// };

// export default ItemList;

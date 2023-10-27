import { Identifier } from "react-admin";

export interface Post {
    id: Identifier;
    userId: number;
    title: string;
    body: string;
  }
  

export interface InputTypeItem {
    inputType: string;
    key: string;
    label: string;
    value?: boolean;
  }
  
  export interface InputTypeTab {
    tab: string;
    items: InputTypeItem;
  }
  
  export type InputArrayType = InputTypeTab[];
  

  export interface User {
    id: Identifier,
    email: string,
    name: string,
    phone: number,
    username: string,
    website: string,
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    
     }
  }
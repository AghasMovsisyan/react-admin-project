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
  
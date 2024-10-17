import { Image } from "./image";
import { PostType } from "./post-type.enum";

export interface Post {
    id: number;
    title: string;
    content: string;
    type: PostType;     
    dateTime: string;  
    deleted: boolean;
    image?: Image;
    file?: string;
  }
  
  export interface PostPage {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    content: Post[];
    number: number;
    numberOfElements: number;
    empty: boolean;
  }
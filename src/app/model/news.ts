import { NewsType } from "../news/news-type.enum";
import { Image } from "./image";

export interface News {
    id: number;
    title: string;
    content: string;
    type: NewsType;     
    dateTime: string;   
    clicks: number;
    pinned: boolean;
    deleted: boolean;
    image?: Image;
    comments?: Comment[];
  }
  
  export interface NewsPage {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    content: News[];
    number: number;
    numberOfElements: number;
    empty: boolean;
  }
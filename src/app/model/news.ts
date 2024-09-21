import { NewsType } from "../news/news-type.enum";

export interface News {
    id: number;
    title: string;
    content: string;
    type: NewsType;     
    dateTime: string;   
    clicks: number;
    pinned: boolean;
    deleted: boolean;
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
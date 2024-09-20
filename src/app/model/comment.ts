import { News } from "./news";

export interface Comment {
    id: number;
    content: string;
    commentCreatedDate: string;
    reply?: string;  
    replyCreatedDate?: string;  
    approved: boolean;
    username: string; 
    news?: News;
  }
import { News } from "./news";
import { User } from "./user";

export interface Comment {
    id: number;
    content: string;
    commentCreatedDate: string;
    reply?: string;  
    replyCreatedDate?: string;  
    approved: boolean;
    user: User; 
    news?: News;
  }
export interface User{
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    role: string;
}

export interface UsersPage {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    content: User[];
    number: number;
    numberOfElements: number;
    empty: boolean;
  }
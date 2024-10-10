import { Image } from "./image";
import { PersonType } from "./person-type.enum";

export interface Person{
    id: number;
    type: PersonType;
    firstname: string;
    lastname: string;
    position: string;
    image?: Image;
}
import { Injectable } from '@angular/core';
import axios from 'axios';
import { PersonType } from '../model/person-type.enum';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = 'http://localhost:8080';

  constructor() { }

  async createPerson(type: PersonType, firstname: string, lastname: string, position: string, token: string) {
    const personCreateRequest = {
      type: type,
      firstname: firstname,
      lastname: lastname,
      position: position
    };
    try {
      const response = await axios.post(`${this.baseUrl}/person/create-person`, personCreateRequest, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.statusCode !== 200) {
        console.log('error while inserting new person' + response.data.error);
      }
    } catch (error) {
      console.error('error while inserting new person' + error);
    }
  }

  async getAllPersonType(type:PersonType):Promise<Person[]>{
    try{
      const response = await axios.get(`${this.baseUrl}/public/person/get-all-for-type/${type}`);
      if(response.data.statusCode===200){
        return response.data.personList;
      } else{
        console.log('error while fetching all persons' + response.data.error);
        return [];
      }

    } catch(error){
      console.error('error while fetching all persons' + error);
      return [];
    }
  }

  async editPerson(id:number, type: PersonType, firstname: string, lastname: string, position: string, token: string) {
    const personCreateRequest = {
      type: type,
      firstname: firstname,
      lastname: lastname,
      position: position
    };
    try {
      const response = await axios.put(`${this.baseUrl}/person/edit-person/${id}`, personCreateRequest, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.statusCode !== 200) {
        console.log('error while editing person' + response.data.error);
      }
    } catch (error) {
      console.error('error while editing person' + error);
    }
  }

  async delete(id:number, token: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}/person/delete-person/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.statusCode !== 200) {
        console.log('error while deleting person' + response.data.error);
      }
    } catch (error) {
      console.error('error while deleting person' + error);
    }
  }
}

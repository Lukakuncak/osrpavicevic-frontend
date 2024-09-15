
import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersPage } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = "http://localhost:8080";

  getAllUsers(token: string, page: number = 0, size: number = 10, searchTerm: string = ''): Observable<UsersPage> {
    const url = `${this.BASE_URL}/user-management/get-all?page=${page}&size=${size}&search=${searchTerm}`;
    return new Observable<UsersPage>((observer) => {
      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          observer.next(response.data.usersPage);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  async getYourProfile(token: string): Promise<any> {
    const url = `${this.BASE_URL}/user-management/get-my-info`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUsersById(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/user-management/get/${userId}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(userId: number, token: string): Promise<any> {
    const url = `${this.BASE_URL}/user-management/delete/${userId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(userId: string, userData: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/user-management/update/${userId}`;
    try {
      const response = await axios.put(url, { userData }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

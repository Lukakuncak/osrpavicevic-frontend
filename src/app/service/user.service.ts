
import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UsersPage } from '../model/user';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = "http://localhost:8080/user-management";

  getAllUsers(token: string, page: number = 0, size: number = 10, searchTerm: string = ''): Observable<UsersPage> {
    const url = `${this.BASE_URL}/get-all?page=${page}&size=${size}&search=${searchTerm}`;
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

  getYourProfile(token: string): Observable<User> {
    const url = `${this.BASE_URL}/get-my-info`;
    return new Observable<User>((observer) => {
      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          observer.next(response.data.schoolUser);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  async getUsersById(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/get/${userId}`;
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
    const url = `${this.BASE_URL}/delete/${userId}`;
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

  updateUserById(user: User, token: string): Observable<any> {
    const url = `${this.BASE_URL}/update`;
    return new Observable<User>((observer) => {
      axios.put(url, {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
        , {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  changePassword(oldPassword: string, newPassword: string, token: string): Observable<any> {
    const url = `${this.BASE_URL}/change-password`;
    return new Observable<any>((observer) => {
      axios.post(url, null, {
        params: {
          oldPassword: oldPassword,
          newPassword: newPassword
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response => {
        observer.next(response.data);
        observer.complete();
      })).catch((error) => {
        observer.error(error);
      })
    });
  }
}

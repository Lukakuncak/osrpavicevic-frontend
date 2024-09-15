import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private BASE_URL = "http://localhost:8080/auth";

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isStandardSubject = new BehaviorSubject<boolean>(false);

  constructor() {

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (token) {
        this.isAuthenticatedSubject.next(true);
        if (role === 'ADMIN') {
          this.isAdminSubject.next(true);
          this.isStandardSubject.next(false);
        } else {
          this.isAdminSubject.next(false);
          this.isStandardSubject.next(true);
        }
      }
    }

  }

  async login(username: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    try {
      const response = await axios.post(url, { username, password })
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(userdata: { firstname: string; lastname: string; username: string; password: string; }): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    try {
      console.log(userdata)
      const response = await axios.post(url, {
        firstname: userdata.firstname, lastname: userdata.lastname,
        username: userdata.username, password: userdata.password
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  logOut(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.isAuthenticatedSubject.next(false)
      this.isAdminSubject.next(false)
      this.isStandardSubject.next(false)
    }
  }

  saveToLocalStorageAndUpdateFlags(token: string, role: string): void {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    this.isAuthenticatedSubject.next(true)
    if (role === 'ADMIN') {
      this.isAdminSubject.next(true);
      this.isStandardSubject.next(false);
    } else {
      this.isAdminSubject.next(false);
      this.isStandardSubject.next(true);
    }
  }

  isAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }

  isAdmin() {
    return this.isAdminSubject.asObservable();
  }

  isStandard() {

    return this.isStandardSubject.asObservable();
  }
}

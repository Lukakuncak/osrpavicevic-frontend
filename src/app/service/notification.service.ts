import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private BASE_URL = "http://localhost:8080/notification";

  private notificationCountSubject = new BehaviorSubject<number>(0);
  notificationCount$ = this.notificationCountSubject.asObservable();

  constructor() { }

  async getNotificationWithComments(token: string) {
    try {
      const response = await axios.get(`${this.BASE_URL}/with-comments`, {
        headers: {
          Authorization: `Bearer ${token}` 
        },
      });
      if (response.data.statusCode === 200) {
        this.setNotificationCount(response.data.notifications.length);
        return response.data.notifications;
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  async viewNotification(id:number, token:string){
    try {
      const response = await axios.put(`${this.BASE_URL}/view-single/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}` 
        },
      });
      if (response.data.statusCode !== 200) {
        console.log("Error fetching notifications:", response.data.error);
      } else{
        this.decrementNotificationCount();
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  async viewAllNotification(token: string){
    try {
      const response = await axios.put(`${this.BASE_URL}/view-all`, {},{
        headers: {
          Authorization: `Bearer ${token}` 
        },
      });
      if (response.data.statusCode !== 200) {
        this.setNotificationCount(0);
        console.log("Error fetching notifications:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }


  setNotificationCount(count: number) {
    this.notificationCountSubject.next(count);
  }

  incrementNotificationCount() {
    this.notificationCountSubject.next(this.notificationCountSubject.value + 1);
  }

  decrementNotificationCount() {
    this.notificationCountSubject.next(Math.max(this.notificationCountSubject.value - 1, 0));
  }
}

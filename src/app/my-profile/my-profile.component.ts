import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../service/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: User = {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    role: ''
  };
  token: string;
  notifications: any[] = [];  // To store notifications

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private router: Router

  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token') || '';
      this.loadUser();
      this.loadNotifications();  // Load notifications after user profile is fetched
    }
  }

  loadUser() {
    this.userService.getYourProfile(this.token).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching your info.', error);
      }
    );
  }

  async loadNotifications() {
    try {
      const notifications = await this.notificationService.getNotificationWithComments(this.token);
      this.notifications = notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }

  updateUser(user: User) {
    this.userService.updateUserById(user, this.token).subscribe(
      (updatedUser) => {
        if (updatedUser.statusCode === 200) {
          this.snackBar.open('Успешно сте ажурирали ваше податке', 'Затвори', {
            duration: 3000,
          });
        }
      },
      (error) => {
        console.error('Error updating user info.', error);
        this.snackBar.open('Дошло је до грешке приликом ажурирања', 'Затвори', {
          duration: 3000,
        });
      }
    );
  }

  async visitNews(newsId: number, notificationId: number) {
    await this.notificationService.viewNotification(notificationId, this.token);
    this.router.navigate([`/obavestenje/${newsId}`])
  }

  async markAllAsRead() {
    await this.notificationService.viewAllNotification(this.token);
  }
}

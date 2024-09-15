import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [FormsModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
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

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.loadUser();
    }
  }

  loadUser() {
    this.userService.getYourProfile(this.token).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error("Error fetching your info.", error)
      }
    )
  }

  updateUser(user: User) {
    this.userService.updateUserById(user, this.token).subscribe(
      (updatedUser) => {
        user = updatedUser;
        if (updatedUser.statusCode === 200) {
          this.snackBar.open('Успешно сте ажурирали ваше податке' , 'Затвори', {
            duration: 3000,
          });
        }
      },
      (error) => {
        console.error("Error updating user info.", error);
        this.snackBar.open('Дошло је до грешке приликом ажурирања', 'Затвори', {
          duration: 3000,
        });
      }
    );
  }
}

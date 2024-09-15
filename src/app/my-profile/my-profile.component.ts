import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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

  constructor(private userService: UserService, private routerLink: Router) { }

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

  updateUser() {

  }
}

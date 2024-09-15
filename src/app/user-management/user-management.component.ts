import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UsersPage } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  usersPage!: UsersPage;
  token: string;
  errorMessage: string;
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  pageSizes: number[] = [10, 25, 50, 100];

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.userService.getAllUsers(this.token, this.currentPage, this.pageSize, this.searchTerm).subscribe(
      (data) => {
        this.usersPage = data;
        if (this.usersPage) {
          this.currentPage = this.usersPage.number;
        }
      },
      (error) => {
        console.error('Error fetching users:', error)
      }
    );
  }

  searchUsers(): void {
    this.currentPage = 0;
    this.loadAllUsers();
  }

  showAll(): void {
    this.searchTerm = '';
    this.currentPage = 0;
    this.loadAllUsers();
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.usersPage.totalPages) {
      this.currentPage = page;
      this.loadAllUsers();
    }
  }

  updatePageSize(event: any): void {
    this.pageSize = +event.target.value;
    this.currentPage = 0;
    this.loadAllUsers();
  }

  updateUser(user: User) {
    this.userService.updateUserById(user, this.token).subscribe(
      (updatedUser) => {
        user = updatedUser;
        if (updatedUser.statusCode === 200) {
          this.snackBar.open('Успешно ажуриран корисник са корисничким именом ' + updatedUser.schoolUser.username, 'Затвори', {
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

  async deleteUser(userId: number): Promise<void> {
    try {
      const response = await this.userService.deleteUserById(userId, this.token);
      if (response.statusCode === 200) {
        await this.loadAllUsers();
      } else {
        this.errorMessage = response.error;
      }
    } catch (error) {
      console.error("Error while deleting user: ", error);
    }
  }


}

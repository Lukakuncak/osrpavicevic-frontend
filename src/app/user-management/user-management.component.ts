import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  token: string;
  errorMessage: string;
  searchTerm: string = '';
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  pages: number[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.loadAllUsers();
  }

  async loadAllUsers(): Promise<void> {
    try {
      const data = await this.userService.getAllUsers(this.token, this.currentPage, this.pageSize, this.searchTerm);
      this.users = data.users.map(user => ({
        ...user,
        editableFirstName: user.firstname,
        editableLastName: user.lastname,
        editableRole: user.role
      }));
      this.totalPages = data.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    } catch (error) {
      console.error("Error while fetching users: ", error);
    }
  }

  async searchUsers(): Promise<void> {
    this.currentPage = 0;
    await this.loadAllUsers();
  }

  async changePage(page: number): Promise<void> {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      await this.loadAllUsers();
    }
  }

  async editUser(user: any): Promise<void> {
    const { id, editableFirstName, editableLastName, editableRole } = user;
    // Add your update logic here
  }

  async deleteUser(userId: string): Promise<void> {
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

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  users: any[] = [];
  token: string;
  errorMessage: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    try{
      this.token = localStorage.getItem('token')
      } catch(error){
        console.log("Error while fetching token: ",error)
      }
    this.loadAllUsers();
  }

  async loadAllUsers(): Promise<void> {
    try {
      const data = await this.userService.getAllUsers(this.token);
      this.users = data.users.map(user => ({
        ...user,
        editableFirstName: user.firstname,
        editableLastName: user.lastname,
        editableRole: user.role
      }));
    } catch (error) {
      console.error("Error while fetching users: ", error);
    }
  }

  editUser(user: any): void {
    const { id, editableFirstName, editableLastName, editableRole } = user;
  }

  async deleteUser(userId: string) {
    const response = await this.userService.deleteUserById(userId, this.token);
    if(response.statusCode === 200){
      this.loadAllUsers();
    } else {
      this.errorMessage = response.error
    }
  }
}

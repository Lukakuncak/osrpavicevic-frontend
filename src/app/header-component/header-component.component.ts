import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'] // Corrected to 'styleUrls'
})
export class HeaderComponentComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStandard: boolean;

  constructor(private readonly userService: UserService, private router: Router) {

  }
  ngOnInit(): void {
    this.userService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    }
    )
    this.userService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    }
    )    
    this.userService.isStandard().subscribe(isStandard => {
      this.isStandard = isStandard;
    }
    )
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['/pocetna']); 
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

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

  private clickCount = 0;
  private clickTimeout: any;
  private readonly maxClicks = 5;
  private readonly clickInterval = 500;
  showFlyBy: boolean;

  constructor(private readonly authService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    }
    )
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    }
    )
    this.authService.isStandard().subscribe(isStandard => {
      this.isStandard = isStandard;
    }
    )
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/pocetna']);
  }


  onLogoClick(event: MouseEvent) {
    this.clickCount++;

    event.preventDefault();

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }

    if (this.clickCount === this.maxClicks) {
      this.triggerEasterEgg();
      this.resetClickCount();
    } else {
      this.clickTimeout = setTimeout(() => {
        this.resetClickCount();
      }, this.clickInterval);
    }
  }

  private resetClickCount() {
    this.clickCount = 0;
    clearTimeout(this.clickTimeout);
  }

  private triggerEasterEgg() {
    this.router.navigate(['/prestolonaslednikovica'])

    // this.showFlyBy = true;
    // setTimeout(() => {
    //   this.showFlyBy = false;
    // }, 5000);
  }

}

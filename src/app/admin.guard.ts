import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './service/user.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isAdmin().pipe(
      take(1), 
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(['/pocetna']);
          return false;
        }
      })
    );
  }
}

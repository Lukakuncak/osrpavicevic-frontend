import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet,  } from '@angular/router';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule, 
    RouterLink,
    RouterLinkActive, 
    MatToolbarModule,
    MatButtonModule],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'] // Corrected to 'styleUrls'
})
export class HeaderComponentComponent {


}

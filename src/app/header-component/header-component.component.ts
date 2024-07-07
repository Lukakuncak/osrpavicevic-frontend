import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, } from '@angular/router';

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
export class HeaderComponentComponent {
  
}

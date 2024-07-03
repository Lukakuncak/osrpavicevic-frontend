import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
     CommonModule, 
     RouterLink, 
     RouterLinkActive,
     HeaderComponentComponent, 
     FooterComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'osrpavicevic';
}

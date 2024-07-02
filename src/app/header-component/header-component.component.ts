import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, Scroll, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'] // Corrected to 'styleUrls'
})
export class HeaderComponentComponent {


}

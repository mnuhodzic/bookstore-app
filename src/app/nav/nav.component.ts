import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  categories: string[] = ['business', 'children', 'cookbooks', 'health', 'history', 'travel'];

  constructor() {}
}

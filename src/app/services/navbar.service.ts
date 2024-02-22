import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbar: WritableSignal<{ name?: string; slug: string }[]> = signal([]);

  constructor() { }

  setNavbar(update: { name?: string; slug: string }[]) {
    this.navbar.set(update);
  }

  getNavbar(){
    return this.navbar();
  }
}

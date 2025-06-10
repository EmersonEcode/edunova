/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [],
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.sass']
})
export class HomeHeaderComponent {

  constructor(private authService : AuthService, private router : Router){

  }
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBodyOverflow();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.toggleBodyOverflow();
  }

  private toggleBodyOverflow(): void {
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
      this.toggleBodyOverflow();
    }
  }

  verifyLogin(){
    console.log(this.authService.isLoged())
    if(this.authService.isLoged()){
      this.router.navigate(['/dashboard'])
    }else{
      this.router.navigate(['/auth/', 'login'])
    }

  }

}

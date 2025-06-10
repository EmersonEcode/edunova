import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private userService: UserService) {
  }
  user: User | undefined
  public userEmail: string | null = ''
  public userPassword: string | null = ''

  login() {
    this.user = this.userService.getUser()
    const userEmail = this.user?.email === this.userEmail
    const userPassword = this.user?.password === this.userPassword

    if (userEmail && userPassword) {
      const fakeToken = 'simulated-jwt-token-123456';
      localStorage.setItem('userToken', fakeToken);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuário ou senha inválidos!');
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }
}

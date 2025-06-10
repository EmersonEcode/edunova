import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { SuccessDialogComponent } from '../shared/components/dialog/sucess-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})      
export class AuthService {
  
  constructor(private router: Router, private userService: UserService, private dialog: MatDialog) {

  }

  user: User | undefined;
  public userEmail: string | null = '';
  public userPassword: string | null = '';
  googleCredentials : any
  typeLogin = ''
  login(userEmailFront: string | null, userPasswordFront: string | null){
    this.user = this.userService.getUser();
    const userEmail = userEmailFront === this.user?.email;
    const userPassword = userPasswordFront === this.user?.password;
  
    if (userEmail && userPassword) {
      const fakeToken = 'simulated-jwt-token-123456';
      sessionStorage.setItem('userToken', fakeToken); // <-- trocou aqui
      this.router.navigate(['/dashboard']);
    } else {
     this.dialog.open(
           SuccessDialogComponent, {
             panelClass: 'confirmation-dialog',
             disableClose: true,
             position: {
               top: '0'
             },
             hasBackdrop: true,
             backdropClass: 'dialog-backdrop',
             data: {
               title: 'Falha no Login',
               message: 'Usuário ou senha inválidos!'
             }
           }
           )
    }
    sessionStorage.setItem('typeLogin', 'email')
  }
  

  // 🔐 Novo método de login com Google
  loginWithGoogle(googleCredential: string) {
    this.googleCredentials = jwtDecode(googleCredential)
    sessionStorage.setItem('googleUserName', this.googleCredentials.name)
    sessionStorage.setItem('googleUserEmail', this.googleCredentials.email)
    sessionStorage.setItem('googleUserPicture', this.googleCredentials.picture)
    

    const simulatedLocalToken = 'meu-jwt-proprio-789xyz';
    sessionStorage.setItem('userToken', simulatedLocalToken);
    sessionStorage.setItem('typeLogin', 'google')

    this.router.navigate(['/dashboard']);
  }

  logout() {
    sessionStorage.removeItem('googleUserName')
    sessionStorage.removeItem('googleUserEmail')
    sessionStorage.removeItem('googleUserPicture')
    sessionStorage.removeItem('userToken');
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  returnToLogin(): boolean {
    this.router.navigate(['/login']);
    return false;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('userToken');
  }

  redirectToDashboard(): void{
    if(this.isLoged()){
      this.router.navigate(['/dashboard']);
    }else{
      this.returnToLogin()
    }

  }

  isLoged(): boolean {
    console.log(this.isAuthenticated());
    return this.isAuthenticated();
  }


}

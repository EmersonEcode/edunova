import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/services/auth.service';
import {GoogleCredentialResponse } from 'src/app/models/google.model'; 



@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./signin-form.component.sass']
})

export class SignInFormComponent implements OnInit {
  loginForm: FormGroup;
  formSubmetido = false;
  isSubmitting = false;
  serverError: string | null = null;
  showPassword = false;
  

  @Output() eventEmitterRedirectionToSignIn = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ]],
      rememberMe: [false]
    });
    
  }


  ngOnInit(): void {
    this.loadGoogleLogin()
  }
  
  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  
  loadGoogleLogin(): void {
    // Verifica se a API do Google foi carregada corretamente
    if (typeof window.google !== 'undefined' && window.google.accounts) {
      console.log('Google Identity API carregada com sucesso');

      window.google.accounts.id.initialize({
        client_id: '554295874383-mufop2au59epre63sf2fegfc3giknj2i.apps.googleusercontent.com', // Coloque seu client_id aqui
        callback: this.handleCredentialResponse.bind(this), // Define o callback para processar o token
      });

      // Verifica se o botão pode ser renderizado
      const googleBtn = document.getElementById('googleBtn');
      if (googleBtn) {
        window.google.accounts.id.renderButton(
          googleBtn,  // A div onde o botão será renderizado
          {
            theme: "outline",   
            size: "large",      
            type: "standard",   
            shape: "pill", 
            text: "signin_with",
            logo_alignment: "center"
          }
        );
        console.log('Botão renderizado');
      } else {
        console.error('Div #googleBtn não encontrada');
      }

      // Chama o prompt para forçar o login, caso necessário
      window.google.accounts.id.prompt();
    } else {
      console.error('API do Google não carregada');
      // Tente recarregar ou esperar um tempo para a API ser carregada corretamente
      setTimeout(() => this.loadGoogleLogin(), 1000); // Espera 1 segundo e tenta novamente
    }
  }

  handleCredentialResponse(response: GoogleCredentialResponse) {
    this.authService.loginWithGoogle(response.credential);
  }




  onSubmit(): void {
    this.formSubmetido = true;
    this.loginForm.markAllAsTouched(); // força exibir os erros logo no começo
    
    if (this.loginForm.invalid) {
      console.log('Usuário ou senha inválidos');
      return;
    }
    

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this.isSubmitting = true;
    this.serverError = null;
  
    // Simulação de chamada API
    setTimeout(() => {
      this.authService.login(email, password);

      if(!this.authService.isAuthenticated()){
        this.isSubmitting = false
      }
    }, 1500);
  }
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  redirectToRegister(value: boolean): void {
    if(value){
      this.router.navigate(['/auth/register']);
     }
    this.eventEmitterRedirectionToSignIn.emit(value);
  
  }

  get f() {
    return this.loginForm.controls;
  }

  isAuthenticatedLogin(){
    this.isSubmitting = this.authService.isAuthenticated()
    console.log(this.isSubmitting)

  }
  redirectToHome(value:boolean): void { // Navega para a página de login
    if(value){
     this.router.navigate(['']);
    }
 }

}

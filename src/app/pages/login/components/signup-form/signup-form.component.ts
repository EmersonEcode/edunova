import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../../services/storeged-service.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FormsModule, CommonModule,  ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, MatIconModule,RouterModule, MatProgressSpinnerModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.sass'],
})
export class SignupFormComponent {
  constructor(private router: Router, private storageService: StorageService, private authService: AuthService) {}
  serverError: string | null = null;
  formSubmetido = false; // Para rastrear o clique no botão
  isSubmitting = false;

  // Validador para verificar se as senhas coincidem
  passwordsMatchValidator: (control: AbstractControl) => ValidationErrors | null = (control) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  };

  // Definição do FormGroup com validações
  cadastroForm = new FormGroup(
    {
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(9)]),
      tel: new FormControl('', [Validators.required, Validators.minLength(11)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), // Senha forte
      ]),
      confirmPassword: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.requiredTrue),
    },
    { validators: this.passwordsMatchValidator }
  );

  @Output() eventEmitterRedirectionToLogin = new EventEmitter<boolean>();

  // Método chamado no envio do formulário
  onSubmit() {
    this.formSubmetido = true;
    this.cadastroForm.markAllAsTouched();

    if (this.cadastroForm.invalid) {
      return;
    }

    // Armazena os dados no serviço de armazenamento criptografado
    this.storageService.encryptAndStoreData('userEmail', this.cadastroForm.value.email!);
    this.storageService.encryptAndStoreData('userPassword', this.cadastroForm.value.password!);
    this.storageService.encryptAndStoreData('userName', this.cadastroForm.value.nome!);
    this.storageService.encryptAndStoreData('userCpf', this.cadastroForm.value.cpf!);
    this.storageService.encryptAndStoreData('userTel', this.cadastroForm.value.tel!);

    this.isSubmitting = true
    this.serverError = null;
    // Emite o evento para redirecionamento para a página de login
    setTimeout(()=>{
      if(!this.authService.isAuthenticated()){
        this.router.navigate(['/auth/login']);
        this.eventEmitterRedirectionToLogin.emit(true);
       }else{
        this.serverError = 'Erro ao cadastrar. Tente novamente.';
        this.isSubmitting = false;
       }
    },2500)
  }

  // Redireciona o usuário para a página de login
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  redirectToLogin(value :boolean): void {
    this.router.navigate(['/auth/login']);
    this.eventEmitterRedirectionToLogin.emit(true);
  }
  redirectToHome(value:boolean): void { // Navega para a página de login
     if(value){
      this.router.navigate(['']);
     }
  }
}





import { Component, OnInit} from '@angular/core';
import { SignInFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,SignInFormComponent, SignupFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class LoginComponent implements OnInit{
  typeSelect = false;
  backgroundColor = '#3E92CC'; // Use sua cor principal aqui
  appLogo = '../../assets/logo-header/logo.png'; // Ajuste o caminho do logo
  paramTypeLogin: string | null = ''
  constructor(private route : ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.paramTypeLogin = params.get('type')
      console.log(this.paramTypeLogin)
    })
    if(this.paramTypeLogin === 'register'){
      this.typeSelect = false
    }else{
      this.typeSelect = true
    }
  }


  typeSelected(value: boolean): void {
    this.typeSelect = value;
  }
}

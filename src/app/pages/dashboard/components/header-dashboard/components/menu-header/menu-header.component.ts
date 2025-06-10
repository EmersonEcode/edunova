import { Component, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.sass'
})
export class MenuHeaderComponent {

  constructor(private authService: AuthService, private router: Router){

  }

  @Output() typeDashboardEventEmiiter = new EventEmitter<string>;

  menuOptions = [
    { type: 'Dashboard', icon: 'dashboard', method: 'goToDashboard' },
    { type: 'Gerenciar Cursos', icon: 'create', method: 'goToCreate' },
    { type: 'Contato', icon: 'contact_page', method: 'goToContact' },
    { type: 'Settings', icon: 'settings', method: 'goToSettings' },
    { type: 'Logout', icon: 'logout', method: 'logout'}
  ];

  logout(){
  this.authService.logout()
  }


  perfil(){
    return true
  }

  emitTypeDashboard(method: string){
    this.typeDashboardEventEmiiter.emit(method)
  }

  executeDeterminedFunction(method: string){
    switch(method){
      case 'goToDashboard':
        this.router.navigate(['dashboard'])
        break
      case 'logout':
        this.logout()
        break
      case 'goToCreate':
        this.router.navigate(['dashboard/criarcurso'])

        break
      case 'goToContact':
        this.router.navigate(['dashboard/contatos'])
        break
      case 'goToSettings':
        this.router.navigate(['dashboard/configuracoes'])
        break

    }
  }

}

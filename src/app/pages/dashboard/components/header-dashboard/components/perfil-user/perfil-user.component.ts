import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.sass'
})
export class PerfilUserComponent {

  constructor(private authService: AuthService){

  }

  menuOptions = [
    {type: 'Perfil', method: 'perfil', icon: 'account_circle'},
    {type:'Pedidos', method: 'pedidos', icon: 'shopping_bag'},
    {type:'Sair', method: 'logout', icon: 'logout'}
  ]

  logout(){
  this.authService.logout()
  }

  perfil(){
    return true
  }

  pedidos(){
    return true
  }

  executeDeterminetedFunction(method: string){
    switch(method){
      case 'logout':
        this.logout()
        break
      case 'pedidos':
        this.pedidos()
        break
      case 'perfil':
        this.perfil()

    }
  }

}

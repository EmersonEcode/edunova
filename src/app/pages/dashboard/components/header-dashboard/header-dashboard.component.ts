import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InfoUser,InfoUserGoogle } from 'src/app/models/user.model';
import { PerfilUserComponent } from "./components/perfil-user/perfil-user.component";
import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";
import { ShoppingShartComponent } from "./components/shopping-shart/shopping-shart.component";
import { CartService } from 'src/app/services/cart-service.service';
import { SearchComponent } from "./components/search/search.component";
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.sass',
  standalone: true,
  imports: [PerfilUserComponent, MenuHeaderComponent, ShoppingShartComponent, SearchComponent, MatIconModule]
})
export class HeaderDashboardComponent implements OnInit{

  constructor(private userService: UserService, private cartService: CartService, private authService: AuthService){
    this.quantidadeProdutosNoCarrinho = this.cartService.getProductInTheCartTotal()
    console.log(this.quantidadeProdutosNoCarrinho)
  }
  openPerfilBool = false
  openMenuBool = false
  openCarrinhoBool = false
  itemAdicionado = true
  infoUser : InfoUser | InfoUserGoogle | undefined;
  quantidadeProdutosNoCarrinho : number
  typeLogin : string | null  = ''
  @Output() menuTypeEventEmitter = new EventEmitter<string>

  ngOnInit(): void {
    this.typeLogin = this.userService.getUserTypeLogin()
    console.log(this.typeLogin)
    if(this.typeLogin ===  'google'){
      this.infoUser = this.userService.getInfoUserGoogle()
    }
    else
      this.infoUser = this.userService.getInfoUser()

    this.quantidadeProdutosNoCarrinho = this.cartService.getProductInTheCartTotal()
  }
  
  
  getUserName(){
    return this.infoUser?.name
  }
  openPerfil(){

    if(this.openPerfilBool === true){
      this.openPerfilBool = false
    }else{
      this.openPerfilBool = true
    }
    }
    openMenu(){
      if(this.openMenuBool === true){
        this.openMenuBool = false
      }else{
        this.openMenuBool = true
      }
    }
    openCarrinho(){
      if(this.openCarrinhoBool === true){
        this.openCarrinhoBool = false
      }else{
        this.openCarrinhoBool = true
      }
    }

    getProductInTheShart(value: string){
       this.quantidadeProdutosNoCarrinho = Number(value)
    }

    typeMenuEventEmitterEmit(type: string){
      this.menuTypeEventEmitter.emit(type)
    }
}

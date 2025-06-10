import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Produto, ProdutoList } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.sass'
})
export class CardProductComponent {
@Input() name  = ''
@Input() imagem  = ''
@Input() categoria  =''
@Input() concentracao = '';
@Input() descricao = '';
@Input() preco = '';
@Input() status = '';
@Input() produtoPut: Produto | undefined
@Input() produto: ProdutoList | any

@Input() btnTitle = ''
constructor(private cartService: CartService, private router: Router){

}

addToCart(item: ProdutoList){
      
  this.produtoPut = {
      id:item?.id ?? null,
      name: item?.name ?? null,
      preco: item?.preco ?? null,
      estoque: item?.estoque ?? null,
      status: item?.status ?? null,
      imagem: item?.imagem ?? null,
      quantidade: item?.id ?? 1
    }
    this.cartService.adicionarProduto(this.produtoPut)
  }

  returnToLogin(){
      this.router.navigate(['auth/login'])
    }
}



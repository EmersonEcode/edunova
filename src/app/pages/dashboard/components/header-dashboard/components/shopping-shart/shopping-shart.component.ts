import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Produto } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart-service.service';


@Component({
  selector: 'app-shopping-shart',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './shopping-shart.component.html',
  styleUrl: './shopping-shart.component.sass'
})
export class ShoppingShartComponent implements OnInit{

  constructor(private cartService: CartService){
    this.produto = {
      id:0,
      name: '',
      preco: 0,
      estoque: 0,
      status: false,
      imagem:'',
      quantidade: 0
    }
  }
    @Output() totalProductsInTheCart = new EventEmitter<string>()


    produto: Produto

    quantidade : number | null = 0
    totalCarrinho = 0
    totalItensCarrinho  = 0

    carrinho: Produto[] = []


    ngOnInit(): void {
      this.cartService.carrinho$.subscribe(carrinho => {
        this.carrinho = carrinho
        this.totalProdutos()
        this.gettotalItensCarrinho()
      })
    }


    removeProductItem(index : number){
      this.cartService.removerProduto(index)
      this.totalCarrinho = 0
      this.totalProdutos()
    }




    gettotalItensCarrinho(){
    this.totalItensCarrinho = 0
    this.totalItensCarrinho = this.carrinho.length
    this.setTotalProductInTheShart(String(this.totalItensCarrinho))
    }

    setTotalProductInTheShart(value: string){
      this.totalProductsInTheCart.emit(value)
    }

    totalProdutos(){
        this.carrinho.map((item)=> {
          this.totalCarrinho += Number(Number(item.preco))
        })
    }

   

    finalizarCompra(){
      return true
    }
}

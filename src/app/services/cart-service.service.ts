import { Injectable } from '@angular/core';
import { Produto } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

    private carrinhoKey = 'produto'; // Chave do sessionStorage
    private carrinho: Produto[] = [];
    // BehaviorSubject para atualizar o front automaticamente
    private carrinhoSubject = new BehaviorSubject<Produto[]>(this.getCarrinho());

    public productInTheCartTotal = 0

    // Observable para o front se inscrever
    carrinho$ = this.carrinhoSubject.asObservable();

    // Pega os itens do sessionStorage ao iniciar
    getCarrinho(): Produto[] {
      const carrinhoSalvo = sessionStorage.getItem(this.carrinhoKey);
      return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    }

    // Atualiza o sessionStorage e emite o novo valor para os componentes
    private atualizarCarrinho() {
      sessionStorage.setItem(this.carrinhoKey, JSON.stringify(this.carrinho));
      this.carrinhoSubject.next(this.carrinho);
    }

    // Adiciona um produto ao carrinho
    adicionarProduto(produto: Produto) {
      this.carrinho = this.getCarrinho(); // Atualiza com os itens mais recentes
    
      const idsNoCarrinho = this.carrinho.map(p => p.id);
    
      if (!idsNoCarrinho.includes(produto.id)) {
        this.carrinho.push(produto);
        this.atualizarCarrinho();
        this.productInTheCartTotal = this.carrinho.length;
        console.log(this.productInTheCartTotal)
      } else {
        console.log('Esse produto já está no carrinho!');
      }
    }

    getProductInTheCartTotal(): number {
      return this.productInTheCartTotal
    }

    atualizarQuantidadeProduto(index :number, value : number){
      this.carrinho[index].quantidade = value
      this.atualizarCarrinho();
    }

    // Remove um produto do carrinho
    removerProduto(index: number) {
      this.productInTheCartTotal = this.productInTheCartTotal < 0 ? 0 : this.productInTheCartTotal -= 1
      this.carrinho = this.getCarrinho();
      this.carrinho.splice(index, 1);
      this.atualizarCarrinho();
    }

    // Limpa o carrinho
    limparCarrinho() {
      this.productInTheCartTotal = 0
      this.carrinho = [];
      this.atualizarCarrinho();
    }
  }




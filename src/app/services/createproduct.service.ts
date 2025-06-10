import { Injectable } from '@angular/core';
import { ProdutoList } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../shared/components/dialog/sucess-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {
  private readonly STORAGE_KEY = 'produtoscriados';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private dialog : MatDialog ) {}

  // CREATE - Adicionar novo produto
  createProduto(produto: Omit<ProdutoList, 'id'>): Observable<ProdutoList> {
    const produtos = this.getProdutosFromStorage();
    const novoId = this.generateId(produtos);
    const novoProduto: ProdutoList = { ...produto, id: novoId };
    
    produtos.push(novoProduto);
    this.saveProdutosToStorage(produtos);
    
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
        title: 'Sucesso!',
        message: 'Curso cadastrado com sucesso'
      }
    }
    )

    return of(novoProduto);
    
  }

  // READ - Obter todos os produtos
  getProdutos(): Observable<ProdutoList[]> {
    const produtos = this.getProdutosFromStorage();
    return of(produtos);
  }

  // READ - Obter produto por ID
  getProdutoById(id: number): Observable<ProdutoList> {
    const produtos = this.getProdutosFromStorage();
    const produto = produtos.find(p => p.id === id);
    
    if (!produto) {
      throw new Error(`Produto com id ${id} não encontrado`);
    }
    
    return of(produto);
  }

  // UPDATE - Atualizar produto
  updateProduto(produto: ProdutoList): Observable<ProdutoList> {
    const produtos = this.getProdutosFromStorage();
    const index = produtos.findIndex(p => p.id === produto.id);
    
    if (index === -1) {
      throw new Error(`Produto com id ${produto.id} não encontrado`);
    }
    
    produtos[index] = produto;
    this.saveProdutosToStorage(produtos);
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
          title: 'Sucesso!',
          message: 'Curso Atualizado com sucesso'
        }
      }
      )
    
    return of(produto);
  }

  // DELETE - Remover produto
  deleteProduto(id: number): Observable<ProdutoList> {
    const produtos = this.getProdutosFromStorage();
    const index = produtos.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error(`Produto com id ${id} não encontrado`);
    }
    
    const [produtoRemovido] = produtos.splice(index, 1);
    this.saveProdutosToStorage(produtos);
    
    return of(produtoRemovido);
  }

  // Métodos auxiliares para localStorage
  private getProdutosFromStorage(): ProdutoList[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  private saveProdutosToStorage(produtos: ProdutoList[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtos));
  }

  private generateId(produtos: ProdutoList[]): number {
    if (produtos.length === 0) return 1;
    const maxId = Math.max(...produtos.map(p => p.id || 0));
    return maxId + 1;
  }
}
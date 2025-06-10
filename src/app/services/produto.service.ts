import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProdutoList } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private jsonPath = 'assets/data/datafake.json';   // <- caminho atualizado

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<ProdutoList[]> {
    return this.http.get<ProdutoList[]>(this.jsonPath);
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-filter-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-item.component.html',
  styleUrl: './filter-item.component.sass'
})
export class FilterItemComponent implements OnInit {
  categoriaSelecionada = 'Todos'
  dataCategoria : string[] = []

  @Output() categoriaSelecionadaEmit = new EventEmitter<string>();
  
  constructor(private produtoService : ProdutoService
  ){

  }

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.dataCategoria = Array.from(new Set(data.map(item => item.categoria ?? '')));
        }
      }
    )
    
  }

  enviarCategoria(value: string){
    this.categoriaSelecionadaEmit.emit(value ?? '')
  }
  
  
}

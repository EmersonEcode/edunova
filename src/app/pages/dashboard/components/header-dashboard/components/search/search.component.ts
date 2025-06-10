import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent implements OnInit {
  searchTerm: string | null = ''
  nomes: string[] = []
  filteredItems: string[] = []

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.nomes = data.map(item => item.name || 'Nome não disponível')
        this.filteredItems = [...this.nomes]
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err)
        this.nomes = ['Erro ao carregar produtos']
        this.filteredItems = [...this.nomes]
      }
    })
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.filteredItems = [...this.nomes]
      return
    }

    const term = this.searchTerm.trim().toLowerCase()
    this.filteredItems = this.nomes.filter(item =>
      item.toLowerCase().includes(term))
  }

  clearSearch() {
    this.searchTerm = ''
    this.filteredItems = [...this.nomes]
  }
}
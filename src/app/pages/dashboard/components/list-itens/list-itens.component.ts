  import { Component, Input, OnInit} from '@angular/core';
  import { Produto } from 'src/app/models/product.model';
  import { ProdutoList } from 'src/app/models/product.model';
  import { DashboardBannerComponent } from "../dashboard-banner/dashboard-banner.component";
  import { NgxPaginationModule } from 'ngx-pagination';
  import { ProdutoService } from 'src/app/services/produto.service';
  import { CreateProductService } from 'src/app/services/createproduct.service';
  import { FilterItemComponent } from "./components/filter-item/filter-item.component";
  import { CardProductComponent } from "./components/card-product/card-product.component";

  @Component({
    selector: 'app-list-itens',
    standalone: true,
    imports: [DashboardBannerComponent, NgxPaginationModule, FilterItemComponent, CardProductComponent],
    templateUrl: './list-itens.component.html',
    styleUrl: './list-itens.component.sass'
  })
  export class ListItensComponent implements OnInit {

    constructor(private produtoService: ProdutoService, private createProdutoService: CreateProductService) {
  
    }
    
    @Input() homeSelectNoFilterAndPagination = true

    produto : Produto | undefined
    total = 0
    pagina = 1;
    @Input() itensPorPagina = 6;
    categoriaSelecionada = ''
    @Input() btnTitleCard = 'Adicionar ao Carrinho'
    produtos: ProdutoList[] = [];

    ngOnInit(): void {
      this.produtoService.getProdutos().subscribe({
        next: (data) => {
          data.map(item => this.produtos.push(item))
        }
      
      });
      this.createProdutoService.getProdutos().subscribe({
        next: (data) => {
          data.map(item => this.produtos.push(item))
        }
      })
      }


      get ProdutosPaginados(): ProdutoList[] {
        let produtosFiltrados = this.produtos;
        if(this.categoriaSelecionada && this.categoriaSelecionada != 'Todos'){
          produtosFiltrados = produtosFiltrados.filter(
            produto => produto.categoria === this.categoriaSelecionada
          );
        }
        
        
        const inicio = (this.pagina - 1) * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        console.log(this.categoriaSelecionada)
        return produtosFiltrados.slice(inicio, fim);
      }
      

      get totalPaginas(): number[] {
        return Array(Math.ceil(this.produtos.length / this.itensPorPagina)).fill(0).map((_, i) => i + 1);
      }


      getCategoriaSelecionada(value: string){
        this.categoriaSelecionada = value
      }
    }



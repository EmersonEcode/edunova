import { Component, OnInit } from '@angular/core';
import { CreateProductService } from '../../../../../../../../../../services/createproduct.service';
import { ProdutoList } from '../../../../../../../.././../../models/product.model';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.sass'],
})
export class ProdutoListComponent implements OnInit {
  produtos: ProdutoList[] = [];
  isLoading = true;

  constructor(
    private produtoService: CreateProductService,
    private router: Router,
    public dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.isLoading = false;
      }
    });
  }

  editarProduto(id: number): void {
    this.router.navigate(['dashboard/criarcurso/editar', id]);
  }

  novoProduto(): void {
    this.router.navigate(['dashboard/criarcurso/adicionarcurso']);
  }

  excluirProduto(id: number): void {
      this.produtoService.deleteProduto(id).subscribe({
        next: () => {
          this.produtos = this.produtos.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
        }
      });
  }

  abrirDialog(id: number): void {
    document.body.style.overflow = 'hidden';

    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'confirmation-dialog',
      disableClose: true,
      position: {
        top: '0'
      },
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      data: {
        message: 'Tem certeza que deseja excluir este curso?'
      }

    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.excluirProduto(id)
      } else {
        console.log('Usuário cancelou.');
      }
      document.body.style.overflow = '';
    });
  }
}

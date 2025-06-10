import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports:[
      CommonModule,
      MatTableModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      FormsModule
  
  
    ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.sass'
})
export class OrdersComponent implements OnInit {
pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  displayedColumns: string[] = ['id', 'data', 'total', 'status', 'acoes'];
  statusSelecionado = 'Todos';
  ngOnInit(): void {

    this.pedidosFiltrados = this.pedidos;
  }

  filtrarPedidos(): void {
    if (this.statusSelecionado === 'Todos') {
      this.pedidosFiltrados = this.pedidos;
    } else {
      this.pedidosFiltrados = this.pedidos.filter(p => p.status === this.statusSelecionado);
    }
  }

  verDetalhes(pedido: Pedido): void {
    console.log('🔍 Detalhes do pedido:', pedido);
  }

  editarStatus(pedido: Pedido): void {
    console.log('✏️ Editar status do pedido:', pedido.id);
  }

  excluirPedido(pedido: Pedido): void {
    console.log('Excluir pedido:', pedido.id);
    this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
    this.filtrarPedidos();
  }
}

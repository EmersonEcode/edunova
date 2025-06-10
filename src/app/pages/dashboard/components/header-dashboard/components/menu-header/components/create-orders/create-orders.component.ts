import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from "../orders/orders.component";
import { SignupFormComponent } from "../../../../../../../login/components/signup-form/signup-form.component";
import { ProdutoFormComponent } from "./components/product-form/product-form.component";
import { ProdutoListComponent } from "./components/produto-list/produto-list.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    OrdersComponent,
    SignupFormComponent,
    ProdutoFormComponent,
    ProdutoListComponent,
    RouterModule
],
  templateUrl: './create-orders.component.html',
  styleUrl: './create-orders.component.sass'
})
export class CreateOrdersComponent{
  
}


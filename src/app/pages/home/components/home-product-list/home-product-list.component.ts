import { Component } from '@angular/core';
import { CardProductComponent } from 'src/app/pages/dashboard/components/list-itens/components/card-product/card-product.component';
import { ListItensComponent } from "../../../dashboard/components/list-itens/list-itens.component";

@Component({
  selector: 'app-home-product-list',
  standalone: true,
  imports: [CardProductComponent, ListItensComponent],
  templateUrl: './home-product-list.component.html',
  styleUrls: ['./home-product-list.component.sass']
})
export class HomeProductListComponent {
  
 
}



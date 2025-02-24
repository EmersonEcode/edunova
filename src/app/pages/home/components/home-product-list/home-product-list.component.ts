import { Component } from '@angular/core';

@Component({
  selector: 'app-home-product-list',
  templateUrl: './home-product-list.component.html',
  styleUrls: ['./home-product-list.component.sass']
})
export class HomeProductListComponent {

product_list : object[] = [
  {
    img: "",
    info: ""

  },

]
}

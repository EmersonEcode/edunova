import { Component } from '@angular/core';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { FooterDashboardComponent } from "../dashboard/components/footer-dashboard/footer-dashboard.component";
import { HomeProductListComponent } from "./components/home-product-list/home-product-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeBannerComponent, HomeHeaderComponent, FooterDashboardComponent, HomeProductListComponent, HomeProductListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

}

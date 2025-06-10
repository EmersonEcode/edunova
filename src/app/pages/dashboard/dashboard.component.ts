import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderDashboardComponent } from "./components/header-dashboard/header-dashboard.component";
import {RouterModule } from '@angular/router';
import { FooterDashboardComponent } from "./components/footer-dashboard/footer-dashboard.component"; // <- IMPORTANTE

@Component({

  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderDashboardComponent, RouterModule, FooterDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  constructor(private authService: AuthService){

  }

  typeDashbord = ''

  logout(){
    this.authService.logout()
  }

  getTypeMenuEvent(type: string){
    this.typeDashbord = type
  }
}

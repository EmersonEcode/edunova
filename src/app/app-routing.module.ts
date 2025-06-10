import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from  './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateOrdersComponent } from './pages/dashboard/components/header-dashboard/components/menu-header/components/create-orders/create-orders.component';
import { ContactComponent } from './pages/dashboard/components/header-dashboard/components/menu-header/components/contact/contact.component';
import { SettingsComponent } from './pages/dashboard/components/header-dashboard/components/menu-header/components/settings/settings.component';
import { ListItensComponent } from './pages/dashboard/components/list-itens/list-itens.component';
import { ProdutoFormComponent } from './pages/dashboard/components/header-dashboard/components/menu-header/components/create-orders/components/product-form/product-form.component';
import { ProdutoListComponent } from './pages/dashboard/components/header-dashboard/components/menu-header/components/create-orders/components/produto-list/produto-list.component';
import { ProductUpdateComponent } from './pages/dashboard/components/header-dashboard/components/menu-header/components/create-orders/components/product-update/product-update.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth/:type',
    component: LoginComponent,
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListItensComponent },
      { path: 'criarcurso', component: CreateOrdersComponent,
        children: [
        {path:'adicionarcurso', component: ProdutoFormComponent},
        {path:'editar/:id', component: ProductUpdateComponent},  
          {path:'', component: ProdutoListComponent},
          {path: '**',redirectTo: 'criarcurso', pathMatch: 'full'}
        ]

       },
      { path: 'contatos', component: ContactComponent },
      { path: 'configuracoes', component: SettingsComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } // <- corrigido
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

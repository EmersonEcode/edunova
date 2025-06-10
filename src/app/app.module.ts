import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { StorageService } from './services/storeged-service.service';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask(),
    StorageService,
    provideAnimations(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

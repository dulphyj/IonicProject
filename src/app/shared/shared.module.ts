import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { HeaderComponent } from './components/header/header.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    LoginInputComponent,
    UpdateEmployeeComponent
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    LoginInputComponent,
    UpdateEmployeeComponent,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class SharedModule { }

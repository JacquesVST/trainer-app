import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from '../register/register/register.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [IonicModule, CommonModule, FormsModule, LoginRoutingModule]
})
export class LoginModule {}

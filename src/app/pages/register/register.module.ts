import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [RegisterComponent],
    imports: [IonicModule, CommonModule, FormsModule, RegisterRoutingModule]
})
export class RegisterModule {}

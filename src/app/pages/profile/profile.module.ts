import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    IonicModule, CommonModule, FormsModule, ProfileRoutingModule
  ],
  exports: [ProfileEditComponent]
})
export class ProfileModule { }

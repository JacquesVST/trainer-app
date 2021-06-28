import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }

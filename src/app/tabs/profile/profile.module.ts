import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileRoutingModule } from './profile-routing.module';

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

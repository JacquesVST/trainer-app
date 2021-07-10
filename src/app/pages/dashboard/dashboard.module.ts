import { ProfileComponent } from './profile/profile.component';
import { LibraryComponent } from './library/library.component';
import { ExploreComponent } from './explore/explore.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard/dashboard.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, ExploreComponent, LibraryComponent, ProfileComponent]
})
export class DashboardPageModule {}

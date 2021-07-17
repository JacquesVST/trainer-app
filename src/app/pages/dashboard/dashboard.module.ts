import { ProfileComponent } from './profile/profile.component';
import { LibraryComponent } from './library/library.component';
import { ExploreComponent } from './explore/explore.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [IonicModule, CommonModule, FormsModule, DashboardRoutingModule],
    declarations: [DashboardComponent, ExploreComponent, LibraryComponent, ProfileComponent]
})
export class DashboardModule {}

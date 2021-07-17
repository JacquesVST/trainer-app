import { LibraryViewComponent } from './library-view/library-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewRoutingModule } from './view-routing.module';

@NgModule({
    declarations: [LibraryViewComponent],
    imports: [IonicModule, CommonModule, FormsModule, ViewRoutingModule],
    exports: [LibraryViewComponent]
})
export class ViewModule {}

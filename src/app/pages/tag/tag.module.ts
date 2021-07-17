import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { TagRoutingModule } from './tag-routing.module';
import { TagSelectionComponent } from './tag-selection/tag-selection.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
    declarations: [TagComponent, TagEditComponent, TagSelectionComponent],
    imports: [IonicModule, CommonModule, FormsModule, TagRoutingModule]
})
export class TagModule {}

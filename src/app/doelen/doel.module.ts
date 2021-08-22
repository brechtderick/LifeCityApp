import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Doel } from './doel.model';
import { DoelListComponent } from '../doel-list/doel-list.component';
import { HulpbronnenFilterPipe } from '../hulpbronnen-filter.pipe';
import { DoelFilterPipe } from '../doel-filter.pipe';



@NgModule({
  declarations: [Doel, DoelListComponent, DoelFilterPipe],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [DoelListComponent]
})
export class EmotieregulatieModule { }
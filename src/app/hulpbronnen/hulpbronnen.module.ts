import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Hulpbronnen } from './hulpbronnen.model';
import { HulpbronnenListComponent } from '../hulpbronnen-list/hulpbronnen-list.component';
import { HulpbronnenFilterPipe } from '../hulpbronnen-filter.pipe';


@NgModule({
  declarations: [Hulpbronnen, HulpbronnenListComponent, HulpbronnenFilterPipe],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [HulpbronnenListComponent]
})
export class TalentenModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Talenten } from './talenten.model';
import { TalentenListComponent } from '../talenten-list/talenten-list.component';
import { TalentenFilterPipe } from '../talenten-filter.pipe';


@NgModule({
  declarations: [Talenten, TalentenListComponent, TalentenFilterPipe],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [TalentenListComponent]
})
export class TalentenModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LevenslijnListComponent } from '../levenslijn-list/levenslijn-list.component';
import { LevenslijnFilterPipe } from '../levenslijn-filter.pipe';
import { Levenslijn } from './levenslijn.model';


@NgModule({
  declarations: [Levenslijn, LevenslijnListComponent, LevenslijnFilterPipe],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [LevenslijnListComponent]
})
export class EmotieregulatieModule { }
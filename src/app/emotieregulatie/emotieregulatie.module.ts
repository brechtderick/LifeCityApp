import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmotieregulatieComponent } from './emotieregulatie.component';
import { MaterialModule } from './../material/material.module';
import { EmotieListComponent } from '../emotie-list/emotie-list.component';
import { EmotieFilterPipe } from '../emotie-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmotieregulatieComponent, EmotieListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [EmotieListComponent]
})
export class EmotieregulatieModule { }

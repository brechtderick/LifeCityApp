import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { EmotieregulatieComponent } from './emotieregulatie/emotieregulatie.component';
import { TalentenComponent } from './talenten/talenten.component';
import { HulpbronnenComponent } from './hulpbronnen/hulpbronnen.component';
import { LevenslijnComponent } from './levenslijn/levenslijn.component';
import { DoelenComponent } from './doelen/doelen.component';
import { NavigatieComponent } from './navigatie/navigatie.component';
import { MaterialModule } from './material/material.module';
import { EmotieListComponent } from './emotie-list/emotie-list.component';
import { AddEmotieComponent } from './add-emotie/add-emotie.component';
import { EmotieFilterPipe } from './emotie-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { RegisterComponent } from './user/register/register.component';
import { httpInterceptorProviders } from './http-interceptors';
import { TalentenListComponent } from './talenten-list/talenten-list.component';
import { AddTalentComponent } from './add-talent/add-talent.component';
import { AddHulpbronComponent } from './add-hulpbron/add-hulpbron.component';
import { HulpbronnenListComponent } from './hulpbronnen-list/hulpbronnen-list.component';
import { AddLevenslijnComponent } from './add-levenslijn/add-levenslijn.component';
import { LevenslijnListComponent } from './levenslijn-list/levenslijn-list.component';
import { AddDoelComponent } from './add-doel/add-doel.component';
import { DoelListComponent } from './doel-list/doel-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    EmotieregulatieComponent,
    TalentenComponent,
    HulpbronnenComponent,
    LevenslijnComponent,
    DoelenComponent,
    NavigatieComponent,
    EmotieListComponent,
    AddEmotieComponent,
    EmotieFilterPipe,
    TalentenListComponent,
    AddTalentComponent,
    AddHulpbronComponent,
    HulpbronnenListComponent,
    AddLevenslijnComponent,
    LevenslijnListComponent,
    AddDoelComponent,
    DoelListComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

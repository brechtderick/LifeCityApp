import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmotieListComponent } from './emotie-list/emotie-list.component';
import { TalentenComponent } from './talenten/talenten.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HulpbronnenComponent } from './hulpbronnen/hulpbronnen.component';
import { LevenslijnComponent } from './levenslijn/levenslijn.component';
import { DoelenComponent } from './doelen/doelen.component';
import { TalentenListComponent } from './talenten-list/talenten-list.component';
import { HulpbronnenListComponent } from './hulpbronnen-list/hulpbronnen-list.component';
import { LevenslijnListComponent } from './levenslijn-list/levenslijn-list.component';
import { DoelListComponent } from './doel-list/doel-list.component';

const appRoutes: Routes = [
  { path: 'emoties', component: EmotieListComponent },
  { path: 'talenten', component: TalentenListComponent },
  { path: 'hulpbronnen', component: HulpbronnenListComponent },
  { path: 'levenslijn', component: LevenslijnListComponent },
  { path: 'doelen', component: DoelListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'emoties', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

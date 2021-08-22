import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthenticationService } from '../user/authentication.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigatie',
  templateUrl: './navigatie.component.html',
  styleUrls: ['./navigatie.component.css']
})
export class NavigatieComponent implements OnInit {
  loggedInUser$ = this._authenticationService.user$;

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { }

  logout() {
    this._authenticationService.logout();
  }
  login() {
    console.log('login');
    this._router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}

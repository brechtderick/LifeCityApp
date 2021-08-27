import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LevenslijnDataService } from '../levenslijn-data.service';
import { Levenslijn } from '../levenslijn/levenslijn.model';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-levenslijn-list',
  templateUrl: './levenslijn-list.component.html',
  styleUrls: ['./levenslijn-list.component.css']
})
export class LevenslijnListComponent implements OnInit {
  loggedInUser$ = this._authenticationService.user$
  public filterLevenslijnNaam: string='';
  public levenslijn: Levenslijn[] | undefined;
  public filterLevenslijnNaam$ = new Subject<string>();
  private _fetchLevenslijn$: Observable<Levenslijn[]> = this._levenslijnDataService.levenslijn$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  public errorMessage: string = '';

  constructor(
    private _levenslijnDataService: LevenslijnDataService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
  ) {
    this.filterLevenslijnNaam$
    .pipe(distinctUntilChanged(), debounceTime(250))
    .subscribe((val) => {
      const params = val? {queryParams: {filter: val}} :undefined;
      this._router.navigate(['/levenslijn'], params);
    })
   }

   applyFilter(filter:string){
     this.filterLevenslijnNaam = filter;
   }

   get levenslijn$(): Observable<Levenslijn[]>{
     return this._fetchLevenslijn$;
   }

  ngOnInit(): void {
    this._fetchLevenslijn$ = this._levenslijnDataService.levenslijn$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    this._route.queryParams.subscribe(params => {
      this._levenslijnDataService
      .getLevenslijnUser$(this.loggedInUser$.value)
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe();
      if (params['filter']) {
        this.filterLevenslijnNaam = params['filter'];
      }
    });

    this.filterLevenslijnNaam$
    .pipe(
      distinctUntilChanged(),
      debounceTime(250)
    )
    .subscribe(
      val => {
        const params = val ? {queryParams: {filter:val}} : undefined;
        this._router.navigate(['/levenslijn'], params);
      }
    )
  }

  addNewLevenslijn(levenslijn:Levenslijn) {
    this._levenslijnDataService.addNewLevenslijn(levenslijn)
  }

}

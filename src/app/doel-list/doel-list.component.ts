import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DoelDataService } from '../doel-data.service';
import { Doel } from '../doelen/doel.model';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-doel-list',
  templateUrl: './doel-list.component.html',
  styleUrls: ['./doel-list.component.css']
})
export class DoelListComponent implements OnInit {
  loggedInUser$ = this._authenticationService.user$
  public filterDoelNaam: string='';
  public doel: Doel[] | undefined;
  public filterDoelNaam$ = new Subject<string>();
  private _fetchDoel$: Observable<Doel[]> = this._doelDataService.doel$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  public errorMessage: string = '';

  constructor(
    private _doelDataService: DoelDataService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
  ) {
    this.filterDoelNaam$
    .pipe(distinctUntilChanged(), debounceTime(250))
    .subscribe((val) => {
      const params = val? {queryParams: {filter: val}} :undefined;
      this._router.navigate(['/doel'], params);
    })
   }

   applyFilter(filter:string){
     this.filterDoelNaam = filter;
   }

   get doel$(): Observable<Doel[]>{
     return this._fetchDoel$;
   }

  ngOnInit(): void {
    this._fetchDoel$ = this._doelDataService.doel$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    this._route.queryParams.subscribe(params =>{
      this._doelDataService
      .getDoelUser$(this.loggedInUser$.value)
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe();
      if(params['filter']) {
        this.filterDoelNaam = params['filter'];
      }
    });

    this.filterDoelNaam$
    .pipe(
      distinctUntilChanged(),
      debounceTime(250)
    )
    .subscribe(
      val => {
        const params = val ? {queryParams: {filter:val}} : undefined;
        this._router.navigate(['/doel'], params);
      }
    )
  }

  addNewDoel(doel:Doel) {
    this._doelDataService.addNewDoel(doel)
  }

}

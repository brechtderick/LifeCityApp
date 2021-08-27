import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TalentenDataService } from '../talenten-data.service';
import { Talenten } from '../talenten/talenten.model';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-talenten-list',
  templateUrl: './talenten-list.component.html',
  styleUrls: ['./talenten-list.component.css']
})
export class TalentenListComponent implements OnInit {
  loggedInUser$ = this._authenticationService.user$
  public filterTalentenNaam: string='';
  public talenten: Talenten[] | undefined;
  public filterTalentenNaam$ = new Subject<string>();
  private _fetchTalenten$: Observable<Talenten[]> = this._talentenDataService.talenten$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  public errorMessage: string = '';

  constructor(
    private _talentenDataService: TalentenDataService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
  ) {
    this.filterTalentenNaam$
    .pipe(distinctUntilChanged(), debounceTime(250))
    .subscribe((val) => {
      const params = val ? { queryParams: { filter: val } } : undefined;
      this._router.navigate(['/talenten'], params);
    })
  }

  applyFilter(filter: string) {
    this.filterTalentenNaam = filter;
  }

  get talenten$(): Observable<Talenten[]>{
    return this._fetchTalenten$;
  }

  ngOnInit(): void {
    this._fetchTalenten$ = this._talentenDataService.talenten$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    this._route.queryParams.subscribe(params => {
      this._talentenDataService
      .getTalentUser$(this.loggedInUser$.value)
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe();
      if (params['filter']) {
        this.filterTalentenNaam = params['filter'];
      }
    });

    this.filterTalentenNaam$
    .pipe(
      distinctUntilChanged(),
      debounceTime(250)
    )
    .subscribe(
      val => {
        const params = val ? {queryParams: {filter:val}} : undefined;
        this._router.navigate(['/talenten'], params);
      }
    )
  }

  addNewTalent(talent:Talenten) {
    this._talentenDataService.addNewTalent(talent);
  }

}

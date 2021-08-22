import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HulpbronDataService } from '../hulpbron-data.service';
import { Hulpbronnen } from '../hulpbronnen/hulpbronnen.model';

@Component({
  selector: 'app-hulpbronnen-list',
  templateUrl: './hulpbronnen-list.component.html',
  styleUrls: ['./hulpbronnen-list.component.css']
})
export class HulpbronnenListComponent implements OnInit {
  public filterHulpbronnenNaam: string='';
  public hulpbronnen: Hulpbronnen[] | undefined;
  public filterHulpbronnenNaam$ = new Subject<string>();
  private _fetchHulpbronnen$: Observable<Hulpbronnen[]> = this._hulpbronnenDataService.hulpbronnen$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  public errorMessage: string = '';

  constructor(
    private _hulpbronnenDataService: HulpbronDataService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.filterHulpbronnenNaam$
    .pipe(distinctUntilChanged(), debounceTime(250))
    .subscribe((val) => {
      const params = val ? {queryParams: {filter: val }} :undefined;
      this._router.navigate(['/hulpbronnen'], params);
    })
   }

   applyFilter(filter:string) {
     this.filterHulpbronnenNaam = filter;
   }

   get hulpbronnen$(): Observable<Hulpbronnen[]>{
     return this._fetchHulpbronnen$;
   }

  ngOnInit(): void {
    this._fetchHulpbronnen$ = this._hulpbronnenDataService.hulpbronnen$.pipe(
      catchError(err =>{
        this.errorMessage = err;
        return EMPTY;
      })
    );

    this._route.queryParams.subscribe(params => {
      this._hulpbronnenDataService
      .getHulpbronnen$(params['filter'])
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe(val => (this.hulpbronnen = val));
      if (params['filter']) {
        this.filterHulpbronnenNaam = params['filter'];
      }
    });

    this.filterHulpbronnenNaam$
    .pipe(
      distinctUntilChanged(),
      debounceTime(250)
    )
    .subscribe(
      val => {
        const params = val ? {queryParams: {filter:val}} : undefined;
        this._router.navigate(['/hulpbronnen'], params);
      }
    )
  }

  addNewHulpbron(hulpbron:Hulpbronnen) {
    this._hulpbronnenDataService.addNewHulpbron(hulpbron)
  }

}

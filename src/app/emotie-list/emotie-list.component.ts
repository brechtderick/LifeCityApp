import { Component, OnInit } from '@angular/core';
import { EmotieDataService } from '../emotie-data.service';
import { Emotieregulatie } from '../emotieregulatie/emotieregulatie.model';
import { EMPTY, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime,
  map, filter, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emotie-list',
  templateUrl: './emotie-list.component.html',
  styleUrls: ['./emotie-list.component.css']
})
export class EmotieListComponent implements OnInit {

  public filterEmotieBeschrijving: string ='' ;
  public emoties: Emotieregulatie[] | undefined;
  public filterEmotieBeschrijving$ = new Subject<string>();
  private _fetchEmoties$: Observable<Emotieregulatie[]> = this._emotieDataService.emoties$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  public errorMessage: string = '';

  constructor(
    private _emotieDataService: EmotieDataService,
    private _router: Router,
    private _route: ActivatedRoute
    ) 
    {
    this.filterEmotieBeschrijving$
    .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((val) => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/emoties'], params);
      });

  }

  applyFilter(filter: string) {
    this.filterEmotieBeschrijving = filter;
  }

  get emoties$(): Observable<Emotieregulatie[]>{
    return this._fetchEmoties$;
  }

  ngOnInit(): void {
    this._fetchEmoties$ = this._emotieDataService.emoties$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    this._route.queryParams.subscribe(params => {
      this._emotieDataService
        .getEmoties$(params['filter'])
        .pipe(
          catchError((err) => {
            this.errorMessage = err;
            return EMPTY;
          })
        )
        .subscribe(val => (this.emoties = val));
      if (params['filter']) {
        this.filterEmotieBeschrijving = params['filter'];
      }
    });

    this.filterEmotieBeschrijving$
    .pipe(
      distinctUntilChanged(),
        debounceTime(250)
    )
    .subscribe(
      val => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/emoties'], params);
      }
    );
  }

 addNewEmotie(emotie:Emotieregulatie) {
   this._emotieDataService.addNewEmotie(emotie);
 }

}

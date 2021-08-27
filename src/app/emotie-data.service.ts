import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Emotieregulatie } from './emotieregulatie/emotieregulatie.model';
import { AuthenticationService } from './user/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EmotieDataService {
  loggedInUser$ = this._authenticationService.user$
  private _emoties$ = new BehaviorSubject<Emotieregulatie[]>([]);
  private _emoties: Emotieregulatie[] | undefined;
  private _reloadEmoties$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private _authenticationService: AuthenticationService) {
    this.emoties$.subscribe((emoties: Emotieregulatie[]) =>{
      this._emoties = emoties;
      this._emoties$.next(this._emoties);
    });
   }

   get allEmoties$(): Observable<Emotieregulatie[]> {
    return this._emoties$;
  }

  get emoties$(): Observable< Emotieregulatie[] > {
    return this.http.get(`${environment.apiUrl}/emotieregulaties/${this.loggedInUser$.value}`).pipe(
      tap(console.log),
      shareReplay(1),
      map((list: any[]): Emotieregulatie[] => list.map(Emotieregulatie.fromJSON))
    );
  }

  getEmotie$(id: string): Observable<Emotieregulatie> {
    return this.http
      .get<any>(`${environment.apiUrl}/recipes/${id}`)
      .pipe(catchError(this.handleError), map(Emotieregulatie.fromJSON)); // returns just one recipe, as json
  }

  getEmotieUser$(user: string): Observable<Emotieregulatie> {
    return this.http
      .get<any>(`${environment.apiUrl}/recipes/${user}`)
      .pipe(catchError(this.handleError), map(Emotieregulatie.fromJSON)); // returns just one recipe, as json
  }

  getEmoties$(beschrijving?: string, dateAdded?: Date, emoties?: string) {
    return this._reloadEmoties$.pipe(
      switchMap(() => this.fetchEmoties$(beschrijving, dateAdded, emoties))
    );
  }

  fetchEmoties$(beschrijving?: string, dateAdded?: Date, emoties?: string) {
    let params = new HttpParams();
    params = beschrijving ? params.append('beschrijving', beschrijving) : params;
    params = dateAdded ? params.append('dateAdded', dateAdded.toString()) : params;
    params = emoties ? params.append('emoties', emoties) : params;
    return this.http.get<any>(`${environment.apiUrl}/emotieregulaties/`, { params }).pipe(
      catchError(this.handleError),
      map((list: any[]): Emotieregulatie[] => list.map(Emotieregulatie.fromJSON))
    );
  }

  addNewEmotie(emotie: Emotieregulatie) {
    return this.http
      .post<any>(`${environment.apiUrl}/emotieregulaties/`, emotie.toJSON())
      .pipe(catchError(this.handleError), map(Emotieregulatie.fromJSON))
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        tap((em: Emotieregulatie) => {
          this._reloadEmoties$.next(true);
        })
      )
      .subscribe(response => {
        console.log(response);
        this.getEmoties$
      });
     
  }

  deleteEmotie(emotie: Emotieregulatie) {
    return this.http
      .delete(`${environment.apiUrl}/emotieregulaties/${emotie.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._reloadEmoties$.next(true);
      });
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

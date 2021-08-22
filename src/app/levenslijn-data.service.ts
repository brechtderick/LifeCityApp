import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Levenslijn } from './levenslijn/levenslijn.model';

@Injectable({
  providedIn: 'root'
})
export class LevenslijnDataService {
  private _levenslijn$ = new BehaviorSubject<Levenslijn[]>([]);
  private _levenslijn: Levenslijn[] | undefined;
  private _reloadLevenslijn$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this._levenslijn$.subscribe((Levenslijn: Levenslijn[]) =>{
      this._levenslijn = Levenslijn;
      this._levenslijn$.next(this._levenslijn);
    });
   }

   get allLevenslijn$(): Observable<Levenslijn[]> {
     return this._levenslijn$;
   }

   get levenslijn$(): Observable<Levenslijn[]> {
     return this.http.get(`${environment.apiUrl}/levenslijn/`).pipe(
      tap(console.log),
      shareReplay(1),
      map((list:any[]): Levenslijn[] => list.map(Levenslijn.fromJSON))
     )
   }

   getLevenslijn$(id: string): Observable<Levenslijn>{
     return this.http
     .get<any>(`${environment.apiUrl}/levenslijn/id/${id}`)
     .pipe(catchError(this.handleError), map(Levenslijn.fromJSON));
   }

   getLevenslijnUser$(user: string): Observable<Levenslijn> {
     return this.http
     .get<any>(`${environment.apiUrl}/levenslijn/${user}`)
     .pipe(catchError(this.handleError), map(Levenslijn.fromJSON));
   }

   getLevenslijnen$(naam?: string, user?: string, beschrijving?: string, datum?: Date){
     return this._reloadLevenslijn$.pipe(
       switchMap(() => this.fetchLevenslijn$(naam,user,beschrijving,datum))
     );
   }

   fetchLevenslijn$(naam?: string, user?: string, beschrijving?: string, datum?: Date){
     let params = new HttpParams();
     params = naam? params.append('naam',naam) : params;
     params = user? params.append('user',user) : params;
     params = beschrijving? params.append('beschrijving',beschrijving) : params;
     params = datum? params.append('datum',datum.toString()) : params;
     return this.http.get<any>(`${environment.apiUrl}/levenslijn/`,{params}).pipe(
       catchError(this.handleError),
       map((list: any[]): Levenslijn[] => list.map(Levenslijn.fromJSON))
     )
   }

   addNewLevenslijn(levenslijn: Levenslijn) {
     return this.http
     .post<any>(`${environment.apiUrl}/levenslijn/`, levenslijn.toJSON())
     .pipe(catchError(this.handleError), map(Levenslijn.fromJSON))
     .pipe(
       catchError((err) => {
         return throwError(err);
       }),
       tap((l:Levenslijn) =>{
         this._reloadLevenslijn$.next(true);
       })
     )
     .subscribe()
   }

   deleteLevenslijn(levenslijn: Levenslijn){
     return this.http
     .delete(`${environment.apiUrl}/levenslijn/${levenslijn.id}`)
     .pipe(catchError(this.handleError))
     .subscribe();
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

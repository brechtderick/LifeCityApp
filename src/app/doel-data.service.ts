import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doel } from './doelen/doel.model';
import { AuthenticationService } from './user/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DoelDataService {
  loggedInUser$ = this._authenticationService.user$
  private _doel$ = new BehaviorSubject<Doel[]>([]);
  private _doel: Doel[] | undefined;
  private _reloadDoel$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private _authenticationService: AuthenticationService) {
    this._doel$.subscribe((Doel: Doel[]) =>{
      this._doel = Doel;
      this._doel$.next(this._doel);
    });
   }

   get allDoelen$(): Observable<Doel[]> {
     return this._doel$;
   }

   get doel$(): Observable<Doel[]> {
     return this.http.get(`${environment.apiUrl}/doel/${this.loggedInUser$.value}`).pipe(
      tap(console.log),
      shareReplay(1),
      map((list:any[]): Doel[] => list.map(Doel.fromJSON))
     )
   }

   getDoel$(id: string): Observable<Doel>{
     return this.http
     .get<any>(`${environment.apiUrl}/doel/id/${id}`)
     .pipe(catchError(this.handleError), map(Doel.fromJSON));
   }

   getDoelUser$(user: string): Observable<Doel> {
     return this.http
     .get<any>(`${environment.apiUrl}/doel/${user}`)
     .pipe(catchError(this.handleError), map(Doel.fromJSON));
   }

   getDoelen$(naam?: string, user?: string, beschrijving?: string, datum?: Date){
     return this._reloadDoel$.pipe(
       switchMap(() => this.fetchDoelen$(naam,user,beschrijving,datum))
     )
   }

   fetchDoelen$(naam?: string, user?: string, beschrijving?: string, datum?: Date){
     let params = new HttpParams();
     params = naam? params.append('naam',naam) : params;
     params = user? params.append('user',user) : params;
     params = beschrijving? params.append('beschrijving',beschrijving) : params;
     params = datum? params.append('datum',datum.toString()) : params;
     return this.http.get<any>(`${environment.apiUrl}/doel/`,{params}).pipe(
       catchError(this.handleError),
       map((list: any[]): Doel[] => list.map(Doel.fromJSON))
     )
   }

   addNewDoel(doel: Doel) {
     return this.http
     .post<any>(`${environment.apiUrl}/doel/`, doel.toJSON())
     .pipe(catchError(this.handleError), map(Doel.fromJSON))
     .pipe(
       catchError((err) => {
         return throwError(err);
       }),
       tap((d:Doel) => {
         this._reloadDoel$.next(true);
       })
     )
     .subscribe()
   }

   deleteDoel(doel: Doel){
     return this.http
     .delete(`${environment.apiUrl}/doel/${doel.id}`)
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

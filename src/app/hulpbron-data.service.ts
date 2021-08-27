import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hulpbronnen } from './hulpbronnen/hulpbronnen.model';
import { AuthenticationService } from './user/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HulpbronDataService {
  loggedInUser$ = this._authenticationService.user$
  private _hulpbronnen$ = new BehaviorSubject<Hulpbronnen[]>([]);
  private _hulpbronnen: Hulpbronnen[] | undefined;
  private _reloadHulpbronnen$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient, 
    private _authenticationService: AuthenticationService) {
    this._hulpbronnen$.subscribe((hulpbronnen: Hulpbronnen[]) =>{
      this._hulpbronnen = hulpbronnen;
      this._hulpbronnen$.next(this._hulpbronnen);
    });
   }

   get allHulpbronnen$(): Observable<Hulpbronnen[]> {
     return this._hulpbronnen$;
   }

   get hulpbronnen$(): Observable<Hulpbronnen[]>{
    
     return this.http.get(`${environment.apiUrl}/hulpbron/${this.loggedInUser$.value}`).pipe(
      tap(console.log),
      shareReplay(1),
       map((list:any[]): Hulpbronnen[] =>list.map(Hulpbronnen.fromJSON))
     )
    
   }

   getHulpbron$(id: string): Observable<Hulpbronnen>{
     return this.http
     .get<any>(`${environment.apiUrl}/hulpbron/id/${id}`)
     .pipe(catchError(this.handleError), map(Hulpbronnen.fromJSON));
   }

   getHulpbronnenUser$(user: string): Observable<Hulpbronnen> {
     return this.http
     .get<any>(`${environment.apiUrl}/hulpbron/${user}`)
     .pipe(catchError(this.handleError), map(Hulpbronnen.fromJSON));
   }

   getHulpbronnen$(naam?: string, user?: string, beschrijving?: string){
      return this._reloadHulpbronnen$.pipe(
        switchMap(() => this.fetchHulpbronnen$(naam,user,beschrijving))
      );
   }

   fetchHulpbronnen$(naam?:string, user?:string, beschrijving?:string){
     let params =new HttpParams();
     params = naam? params.append('naam',naam) : params;
     params = user?params.append('user', user):params;
     params = beschrijving?params.append('beschrijving', beschrijving) : params;
     return this.http.get<any>(`${environment.apiUrl}/hulpbron/${user}`,{params}).pipe(
       catchError(this.handleError),
       map((list: any[]): Hulpbronnen[] => list.map(Hulpbronnen.fromJSON))
     )
   }

   addNewHulpbron(hulpbron: Hulpbronnen) {
     return this.http
     .post<any>(`${environment.apiUrl}/hulpbron/`, hulpbron.toJSON())
     .pipe(catchError(this.handleError), map(Hulpbronnen.fromJSON))
     .pipe(
       catchError((err) => {
         return throwError(err);
       }),
       tap((h:Hulpbronnen) =>{
         this._reloadHulpbronnen$.next(true);
       })
     )
     .subscribe()
   }

   deleteHulpbron(hulpbron: Hulpbronnen){
     return this.http
     .delete(`${environment.apiUrl}/hulpbron/${hulpbron.id}`)
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

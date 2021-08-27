import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Talenten } from './talenten/talenten.model';
import { AuthenticationService } from './user/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TalentenDataService {
  loggedInUser$ = this._authenticationService.user$
  private _talenten$ = new BehaviorSubject<Talenten[]>([]);
  private _talenten: Talenten[] | undefined;
  private _reloadTalenten$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient, 
    private _authenticationService: AuthenticationService) {
    this._talenten$.subscribe((talenten: Talenten[]) =>{
      this._talenten = talenten;
      this._talenten$.next(this._talenten);
    });
   }

   get allTalenten$(): Observable<Talenten[]> {
     return this._talenten$;
   }

   get talenten$():Observable<Talenten[]>{
     return this.http.get(`${environment.apiUrl}/talenten/${this.loggedInUser$.value}`).pipe(
       tap(console.log),
       shareReplay(1),
       map((list: any[]): Talenten[] => list.map(Talenten.fromJSON))
     );
   }

   getTalent$(id: string): Observable<Talenten> {
     return this.http
     .get<any>(`${environment.apiUrl}/talenten/id/${id}`)
     .pipe(catchError(this.handleError), map(Talenten.fromJSON));
   }

   getTalentUser$(user: string): Observable<Talenten> {
    return this.http
    .get<any>(`${environment.apiUrl}/talenten/${user}`)
    .pipe(catchError(this.handleError), map(Talenten.fromJSON));
  }

  getTalenten$(naam?: string, user?: string) {
    return this._reloadTalenten$.pipe(
      switchMap(()=> this.fetchTalenten$(naam,user))
    );
  }

  fetchTalenten$(naam?:string, user?:string) {
    let params = new HttpParams();
    params = naam? params.append('naam',naam) : params;
    params = user?params.append('user',user):params;
    return this.http.get<any>(`${environment.apiUrl}/talenten/`,{params}).pipe(
      catchError(this.handleError),
      map((list: any[]): Talenten[] => list.map(Talenten.fromJSON))
    );
  }

  addNewTalent(talent: Talenten) {
    return this.http
    .post<any>(`${environment.apiUrl}/talenten/`, talent.toJSON())
    .pipe(catchError(this.handleError), map(Talenten.fromJSON))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }),
      tap((t: Talenten) =>{
        this._reloadTalenten$.next(true);
      })
    )
    .subscribe()
  }

  deleteTalent(talent: Talenten){
    return this.http
    .delete(`${environment.apiUrl}/talenten/${talent.id}`)
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

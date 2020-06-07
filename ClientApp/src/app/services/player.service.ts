import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Players/';
  }

  getPlayers(teamid?: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.myAppUrl + this.myApiUrl + 'team/' + teamid)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  uploadHeadshot(player): Observable<Player> {
    return this.http.post<Player>(this.myAppUrl + this.myApiUrl, JSON.stringify(player), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  savePlayer(player): Observable<Player> {
    return this.http.post<Player>(this.myAppUrl + this.myApiUrl, JSON.stringify(player), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updatePlayer(id: string, player): Observable<Player> {
    return this.http.put<Player>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(player), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deletePlayer(id: string): Observable<Player> {
    return this.http.delete<Player>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

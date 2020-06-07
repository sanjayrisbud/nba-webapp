import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Teams/';
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getTeamByTeamId(id: string): Observable<Team> {
    return this.http.get<Team>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveTeam(team): Observable<Team> {
    return this.http.post<Team>(this.myAppUrl + this.myApiUrl, JSON.stringify(team), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateTeam(id: string, team): Observable<Team> {
    return this.http.put<Team>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(team), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteTeam(id: string): Observable<Team> {
    return this.http.delete<Team>(this.myAppUrl + this.myApiUrl + id)
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

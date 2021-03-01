import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEnrollee } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _baseUrl = 'http://localhost:8080';

  constructor(private _http: HttpClient) {}

  getEnrollees(): Observable<any> {
    return this._http
      .get(`${this._baseUrl}/enrollees`)
      .pipe(catchError(this.handleError));
  }

  getEnrollee(id: string): Observable<any> {
    return this._http
      .get(`${this._baseUrl}/enrollees/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateEnrollee(enrollee: IEnrollee): Observable<any> {
    const request_body = {
      active: enrollee.active,
      name: enrollee.name,
      dateOfBirth: enrollee.dateOfBirth,
    };
    return this._http
      .put(`${this._baseUrl}/enrollees/${enrollee.id}`, request_body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}

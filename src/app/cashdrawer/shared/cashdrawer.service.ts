import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Cashdrawer } from './cashdrawer.model';
import { MessageService } from './../../messages/shared/message.service';

import { GlobalVar } from './../../global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CashdrawerService {
  private baseUrl = GlobalVar.BASE_API_URL + '/cashdrawers';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // GET cashdrawer from the server
  getCashdrawers(): Observable<Cashdrawer[]> {
    return this.http
      .get<Cashdrawer[]>(this.baseUrl)
      .pipe(
        tap(_ => this.log(`fetched cashdrawers`)),
        catchError(this.handleError('getCashdrawers', []))
      );
  }
  // GET cashdrawer by id. Will 404 if id not found */
  getCashdrawer(id: number): Observable<Cashdrawer> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http
      .get<Cashdrawer>(url)
      .pipe(
        tap(_ => this.log(`fetched cashdrawer id=${id}`)),
        catchError(this.handleError<Cashdrawer>(`getCashdrawer id=${id}`))
      );
  }

  // PUT update the cashdrawer on the server
  updateCashdrawer(cashdrawer: Cashdrawer): Observable<Cashdrawer> {
    const url = `${this.baseUrl}/${cashdrawer.id}`;
    return this.http
      .put(url, cashdrawer, httpOptions)
      .pipe(
        tap(_ => this.log(`updated cashdrawer id=${cashdrawer.id}`)),
        catchError(this.handleError<any>('updateCashdrawer'))
      );
    }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /* Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add('Cash drawer Service: ' + message);
  }
}

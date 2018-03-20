import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { BasketDetail } from './basket-detail.model';
import { MessageService } from './../../messages/shared/message.service';
import { GlobalVar } from './../../global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BasketDetailService {
  private baseUrl = GlobalVar.BASE_API_URL + '/basketdetails';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  // GET
  getDetails(id: number): Observable<BasketDetail[]> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http
      .get<BasketDetail[]>(url)
      .pipe(
        tap(_ => this.log(`fetched details`)),
        catchError(this.handleError('detDetails', []))
      );
  }

    // GET basket detaiils that contain search term */
    searchBasketDetails(term: string): Observable<BasketDetail[]> {
      const url = `${this.baseUrl}/search/${term}`;
      if (!term.trim()) {
        return of([]);
      }
      return this.http
        .get<BasketDetail[]>(url)
        .pipe(
          tap(_ => this.log(`found products matching "${term}"`)),
          catchError(this.handleError<BasketDetail[]>('searchBaketDetails', []))
        );
    }

  // PUT
  // POST
  // DELETE

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
  /* Log a Detail service message with the MessageService */
  private log(message: string) {
    this.messageService.add('Basket Detail Service: ' + message);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { BasketHeader } from './basket-header.model';
import { MessageService } from './../../messages/shared/message.service';
import { GlobalVar } from './../../global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BasketHeaderService {
  private baseUrl = GlobalVar.BASE_API_URL + '/basketheaders';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  searchBasketHeader(term: string) {}

  /////// REST METHODS ///////
  // GET headers from the server
  getHeaders(): Observable<BasketHeader[]> {
    return this.http
      .get<BasketHeader[]>(this.baseUrl)
      .pipe(
        tap(_ => this.log(`fetched headers`)),
        catchError(this.handleError('getHeaders', []))
      );
  }
  // GET header by id. Will 404 if id not found
  getHeader(id: number): Observable<BasketHeader> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http
      .get<BasketHeader>(url)
      .pipe(
        tap(_ => this.log(`fetched header id=${id}`)),
        catchError(this.handleError<BasketHeader>(`getHeader id=${id}`))
      );
  }
  // GET get the latest basket header aka max id
  getLatestBasketHeader(): Observable<BasketHeader> {
    const url = `${this.baseUrl}/latest`;
    return this.http
      .get<BasketHeader>(url)
      .pipe(
        tap(_ => this.log(`fetched latest header`)),
        catchError(this.handleError<BasketHeader>(`getLatestBasketHeader`))
      );
  }
  // GET get only baskets of type a certrain transaction type
  getBasketHeadersByTrxType(trxType: string): Observable<BasketHeader[]> {
    const url = `${this.baseUrl}/trx/${trxType}`;
    return this.http
      .get<BasketHeader[]>(url)
      .pipe(
        tap(_ => this.log(`fetched ${trxType} headers`)),
        catchError(this.handleError('getBasketHeadersByTrxType', []))
      );
  }
  // GET basket headers that contain search term
  searchBasketHeaders(term: string): Observable<BasketHeader[]> {
    const url = `${this.baseUrl}/search/${term}`;
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<BasketHeader[]>(url)
      .pipe(
        tap(_ => this.log(`found journals matching "${term}"`)),
        catchError(this.handleError<BasketHeader[]>('searchBaketHeaders', []))
      );
  }
  // PUT update basket header on the service
  putBasketHeader(basketHeader: BasketHeader): Observable<BasketHeader> {
    const url = `${this.baseUrl}/${basketHeader.id}`;
    return this.http
      .put(url, basketHeader, httpOptions)
      .pipe(
        tap(_ => this.log(`updated basket header id=${basketHeader.id}`)),
        catchError(this.handleError<any>('putBasketHeader'))
      );
  }

  // POST create a new basket header on the server */
  postBasketHeader(basketHeader: BasketHeader) {
    const url = `${this.baseUrl}`;
    return this.http
      .post(url, basketHeader, httpOptions)
      .pipe(
        tap(_ => this.log(`created basket`)),
        catchError(this.handleError<any>('createBasketHeader'))
      );
  }
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
  /* Log a header service message with the MessageService */
  private log(message: string) {
    this.messageService.add('Basket Service: ' + message);
  }
}

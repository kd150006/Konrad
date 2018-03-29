import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, debounceTime } from 'rxjs/operators';

import { Product } from './product.model';
import { MessageService } from './../../messages/shared/message.service';

import { GlobalVar } from './../../global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {
  private baseUrl = GlobalVar.BASE_API_URL + '/products';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /////// REST METHODS ///////
  /** GET **/
  /* GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError('getProducts', []))
      );
  }
  /* GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http
      .get<Product>(url)
      .pipe(
        tap(_ => this.log(`fetched product id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  /* GET Get all products for a given stock */
  getProductsOnStock(id: number): Observable<Product[]> {
    const url = `${this.baseUrl}/stock/${id}`;
    return this.http
      .get<Product[]>(url)
      .pipe(
        tap(products => this.log(`fetched products for stock id=${id}`)),
        catchError(
          this.handleError<Product[]>(`getProducts for stock id=${id}`)
        )
      );
  }
  /* GET the total qtys of producst for a given stock */
  getTotalStockQty(id: number): Observable<number> {
    const url = `${this.baseUrl}/qty/${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        tap(_ => this.log(`fetched total quantity for stock id=${id}`)),
        catchError(this.handleError<number>(`getProduct id=${id}`))
      );
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    const url = `${this.baseUrl}/search/${term}`;
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>(url).pipe(
      tap(_ => this.log(`found products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }
  /** PUT: update a product on the server */
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http
      .put(url, product, httpOptions)
      .pipe(
        tap(_ => this.log(`updated product id=${product.id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }
  /*PUT: update products on the server*/
  updateProducts(products: Product[]): Observable<Product[]>{
    const url = `${this.baseUrl}/batch`;
    return this.http
      .put(url, products, httpOptions)
      .pipe(
        tap(_ => this.log(`updated product id=${products}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }
  /*POST: create a product on the server */
  createProduct(product: Product) {
    const url = `${this.baseUrl}`;
    return this.http
      .post(url, product, httpOptions)
      .pipe(
        tap(_ => this.log(`created product id=${product.id}`)),
        catchError(this.handleError<Product>('createProduct'))
      );
  }
  /** DELETE **/
  /* DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http
      .delete<Product>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted product id=${id}`)),
        catchError(this.handleError<Product>('deleteProduct'))
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
    this.messageService.add('Product Service: ' + message);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../model/product';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private personasUrl = '/product';
  personasChangeObs = new Subject<Product[]>();


  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}${this.personasUrl}/all`)
      .pipe(
        tap(_ => {
          this.personasChangeObs.next(_);
          this.log('fetched Products');
        }),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.api + this.personasUrl, product, httpOptions).pipe(
      tap((newTodo: Product) => this.log(`added Product w/ id=${newTodo.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(environment.api + this.personasUrl , product , httpOptions).pipe(
      tap(_ => this.log(`updated Product id=${JSON.stringify(Product)}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get(environment.api + this.personasUrl + '/' + id , httpOptions).pipe(
      tap(_ => {
        this.log(`get Product ${JSON.stringify(_)}`);
        this.getProducts().subscribe(personas => {
        });
      }),
      catchError(this.handleError<any>('getProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     this.log(`${operation} failed: ${error.message}`);
     return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}

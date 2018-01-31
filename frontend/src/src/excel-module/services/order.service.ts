/**
 * Created by jin on 1/8/18.
 */

import {Injectable} from '@angular/core'

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, map, tap } from 'rxjs/operators'



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}



@Injectable()
export class OrderService {

  private url = 'api/orders'  // URL to web api
  private urlApi = 'api'  // URL to web api


  constructor (
    private http: HttpClient,
  ) {

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }


  save (orders) {
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  getBusinessNames(): Observable< any[]> {
    return this.http.get<any[]>(this.urlApi + '/businessNames')
      .pipe(
        tap(orders => console.log(`fetched businessNames: `, orders)),
        catchError(this.handleError('getBusinessNames', []))
      )
  }
  getShipNames(): Observable< any[]> {
    return this.http.get<any[]>(this.urlApi + '/shipNames')
      .pipe(
        tap(orders => console.log(`fetched shipNames: `, orders)),
        catchError(this.handleError('getShipNames', []))
      )
  }

  getOrders(query?: any): Observable< any[]> {

    let params = new HttpParams()
      .set('pageSize', query.pageSize)
      .set('pageNo', query.pageNo)

    if (query.businessName) { params = params.append('businessName', query.businessName)}
    if (query.shipName) { params = params.append('shipName', query.shipName)}

    return this.http.get<any[]>(this.url, {params: params})
      .pipe(
        tap(orders => {
          this.save(orders)
          console.log(`fetched orders: `, orders)
        }),
        catchError(this.handleError('getOrders', []))
      )
  }

  getOrderById(id: number): Observable<any> {
    const url = `${this.url}/${id}`

    return this.http.get<any>(url)
      .pipe(
        tap(order => console.log(`fetched order id=${id}`, order)),
        catchError(this.handleError<any>(`getOrderById id=${id}`))
      )
  }


  /** POST: add a new order to the server */
  addOrder (order: any): Observable<any> {

    return this.http.post<any>(this.url, order, httpOptions)
      .pipe(
        tap((resultOrder) => console.log(`added order id=${order.id}`)),
        catchError(this.handleError<any>('addOrder'))
      )
  }


  /** PUT: update the order on the server */
  updateOrder (order: any): Observable<any> {

    return this.http.put(this.url, order, httpOptions)
      .pipe(
        tap(resultOrder => console.log(`updated order id=${order.id}`)),
        catchError(this.handleError<any>('updateOrder'))
      )
  }


  /** DELETE: delete the order from the server */
  deleteOrder (order: any | number): Observable<any> {
    const id = typeof order === 'number' ? order : order.id
    const url = `${this.url}/${id}`

    return this.http.delete<any>(url, httpOptions)
      .pipe(
        tap(resultOrder => console.log(`deleted order id=${id}`, resultOrder)),
        catchError(this.handleError<any>('deleteOrder'))
      )
  }


}

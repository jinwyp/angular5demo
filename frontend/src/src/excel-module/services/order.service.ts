/**
 * Created by jin on 1/8/18.
 */

import {Injectable} from '@angular/core'

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import {of} from 'rxjs/observable/of'
import {catchError, map, tap} from 'rxjs/operators'


const httpOptions = {
    headers : new HttpHeaders({'Content-Type' : 'application/json'})
}


@Injectable()
export class OrderService {

    private urlApi = 'api'  // URL to web api


    constructor(private http: HttpClient,) {

    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error) // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`)

            // Let the app keep running by returning an empty result.
            return of(result as T)
        }
    }


    saveLocalStorage(key: string, result: any) {
        localStorage.setItem(key, JSON.stringify(result))
    }


    getBusinessNames(): Observable<any[]> {
        return this.http.get<any[]>(this.urlApi + '/businessNames')
            .pipe(
                tap(orders => console.log(`fetched businessNames: `, orders)),
                catchError(this.handleError('getBusinessNames', []))
            )
    }


    getOrders(query?: any): Observable<any[]> {

        let params = new HttpParams()
            // .set('pageSize', query.pageSize)
            // .set('pageNo', query.pageNo)

        if (query.businessName) {params = params.append('businessName', query.businessName)}
        if (query.shipName) {params = params.append('shipName', query.shipName)}

        return this.http.get<any[]>(this.urlApi + '/orders', {params : params})
            .pipe(
                tap(orders => {
                    this.saveLocalStorage('orders', orders)
                    console.log(`fetched orders: `, orders)
                }),
                catchError(this.handleError('getOrders', []))
            )
    }

    getOrderById(id: number): Observable<any> {
        const url = `${this.urlApi}/orders/${id}`

        return this.http.get<any>(url)
            .pipe(
                tap(order => console.log(`fetched order id=${id}`, order)),
                catchError(this.handleError<any>(`getOrderById id=${id}`))
            )
    }


    /** POST: add a new order to the server */
    addOrder(order: any): Observable<any> {

        return this.http.post<any>(this.urlApi + '/orders', order, httpOptions)
            .pipe(
                tap((resultOrder) => console.log(`added order id=${order.id}`)),
                catchError(this.handleError<any>('addOrder'))
            )
    }


    /** PUT: update the order on the server */
    updateOrder(order: any): Observable<any> {

        return this.http.put(this.urlApi + '/orders', order, httpOptions)
            .pipe(
                tap(resultOrder => console.log(`updated order id=${order.id}`)),
                catchError(this.handleError<any>('updateOrder'))
            )
    }


    /** DELETE: delete the order from the server */
    deleteOrder(order: any | number): Observable<any> {
        const id  = typeof order === 'number' ? order : order.id
        const url = `${this.urlApi}/orders/${id}`

        return this.http.delete<any>(url, httpOptions)
            .pipe(
                tap(resultOrder => console.log(`deleted order id=${id}`, resultOrder)),
                catchError(this.handleError<any>('deleteOrder'))
            )
    }




    getShips(query?: any): Observable<any[]> {
        let params = new HttpParams()

        if (query.name) { params = params.append('name', query.name) }
        if (query.englishName) { params = params.append('englishName', query.englishName)}
        if (query.company) { params = params.append('company', query.company)}

        return this.http.get<any[]>(this.urlApi + '/ships', {params : params})
            .pipe(
                tap(results => {
                    this.saveLocalStorage('ships', results)
                    console.log(`getShips: `, results)
                }),
                catchError(this.handleError<any>('getShips', []))
            )
    }

    getShipById(id: number): Observable<any> {
        const url = `${this.urlApi}/ships/${id}`

        return this.http.get<any>(url)
            .pipe(
                tap(result => console.log(`getShipById id=${id}: `, result)),
                catchError(this.handleError<any>(`getOrderById id=${id}`))
            )
    }

    addShip(ship: any): Observable<any> {
        return this.http.post<any>(this.urlApi + '/ships', ship, httpOptions)
            .pipe(
                tap((result) => console.log(`addShip id=${ship.id}: `, result)),
                catchError(this.handleError<any>('addShip'))
            )
    }

    updateShip(ship: any): Observable<any> {
        return this.http.put(this.urlApi + '/ships', ship, httpOptions)
            .pipe(
                tap(result => console.log(`updateShip id=${ship.id}: `, result)),
                catchError(this.handleError<any>('updateShip'))
            )
    }

    deleteShip(ship: any | number): Observable<any> {
        const id = typeof ship === 'number' ? ship : ship.id

        return this.http.delete<any>(`${this.urlApi}/ships/${id}: `, httpOptions)
            .pipe(
                tap(result => console.log(`deleteShip id=${id}`, result)),
                catchError(this.handleError<any>('deleteShip'))
            )
    }




    getShipAgencies(query?: any): Observable<any[]> {
        let params = new HttpParams()

        if (query.name) { params = params.append('name', query.name) }

        return this.http.get<any[]>(this.urlApi + '/shipAgencies', {params : params})
            .pipe(
                tap(results => {
                    this.saveLocalStorage('shipAgencies', results)
                    console.log(`getShipAgencies: `, results)
                }),
                catchError(this.handleError<any>('getShipAgencies', []))
            )
    }

    getShipAgencyById(id: number): Observable<any> {
        const url = `${this.urlApi}/shipAgencies/${id}`

        return this.http.get<any>(url)
            .pipe(
                tap(result => console.log(`getShipAgencyById id=${id}: `, result)),
                catchError(this.handleError<any>(`getShipAgencyById id=${id}`))
            )
    }

    addShipAgency(ShipAgency: any): Observable<any> {
        return this.http.post<any>(this.urlApi + '/shipAgencies', ShipAgency, httpOptions)
            .pipe(
                tap((result) => console.log(`addShipAgency id=${ShipAgency.id}: `, result)),
                catchError(this.handleError<any>('addShipAgency'))
            )
    }

    updateShipAgency(ShipAgency: any): Observable<any> {
        return this.http.put(this.urlApi + '/shipAgencies', ShipAgency, httpOptions)
            .pipe(
                tap(result => console.log(`updateShipAgency id=${ShipAgency.id}: `, result)),
                catchError(this.handleError<any>('updateShipAgency'))
            )
    }

    deleteShipAgency(ShipAgency: any | number): Observable<any> {
        const id = typeof ShipAgency === 'number' ? ShipAgency : ShipAgency.id

        return this.http.delete<any>(`${this.urlApi}/shipAgencies/${id}: `, httpOptions)
            .pipe(
                tap(result => console.log(`deleteShipAgency id=${id}`, result)),
                catchError(this.handleError<any>('deleteShipAgency'))
            )
    }






    getHarbors(query?: any): Observable<any[]> {
        let params = new HttpParams()

        if (query.name) { params = params.append('name', query.name) }

        return this.http.get<any[]>(this.urlApi + '/harbors', {params : params})
            .pipe(
                tap(results => {
                    this.saveLocalStorage('harbors', results)
                    console.log(`getHarbors: `, results)
                }),
                catchError(this.handleError<any>('getHarbors', []))
            )
    }

    getHarborById(id: number): Observable<any> {
        const url = `${this.urlApi}/harbors/${id}`

        return this.http.get<any>(url)
            .pipe(
                tap(result => console.log(`getHarborById id=${id}: `, result)),
                catchError(this.handleError<any>(`getHarborById id=${id}`))
            )
    }

    addHarbor(Harbor: any): Observable<any> {
        return this.http.post<any>(this.urlApi + '/harbors', Harbor, httpOptions)
            .pipe(
                tap((result) => console.log(`addHarbor id=${Harbor.id}: `, result)),
                catchError(this.handleError<any>('addHarbor'))
            )
    }

    updateHarbor(Harbor: any): Observable<any> {
        return this.http.put(this.urlApi + '/harbors', Harbor, httpOptions)
            .pipe(
                tap(result => console.log(`updateHarbor id=${Harbor.id}: `, result)),
                catchError(this.handleError<any>('updateHarbor'))
            )
    }

    deleteHarbor(Harbor: any | number): Observable<any> {
        const id = typeof Harbor === 'number' ? Harbor : Harbor.id

        return this.http.delete<any>(`${this.urlApi}/harbors/${id}: `, httpOptions)
            .pipe(
                tap(result => console.log(`deleteHarbor id=${id}`, result)),
                catchError(this.handleError<any>('deleteHarbor'))
            )
    }
}

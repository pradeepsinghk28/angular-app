import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  get(url: string, params: any, reportProgress: boolean = false){

    return this.http.get(url, {
      params: params,
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
      map(res => this.catchProgressEvents(res, reportProgress)),
      filter(res => res !== undefined),
      catchError((err: Error)=> this.throw401Alert(err))
    )
  }

  post(url: string, params: any, reportProgress: boolean = false) {
    return this.http.post(url, params, { reportProgress: true, observe: 'events' }).pipe(
      map(res => this.catchProgressEvents(res, reportProgress)),
      filter(res => res !== undefined),
      catchError((err: Error) => this.throw401Alert(err))
    );
  }

  patch(url: string, params: any, reportProgress: boolean = false) {
    return this.http.patch(url, params, { reportProgress: true, observe: 'events' }).pipe(
      map(res => this.catchProgressEvents(res, reportProgress)),
      filter(res => res !== undefined),
      catchError((err: Error) => this.throw401Alert(err))
    );
  }

  delete(url: string, params?: any, reportProgress: boolean = false) {
    params = this.createHttpParams(params);
    return this.http
      .delete(url, {
        params: params,
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map(res => this.catchProgressEvents(res, reportProgress)),
        filter(res => res !== undefined),
        catchError((err: Error) => this.throw401Alert(err))
      );
  }

  put(url: string, params: any, reportProgress: boolean = false) {
    return this.http.put(url, params, { reportProgress: true, observe: 'events' }).pipe(
      map(res => this.catchProgressEvents(res, reportProgress)),
      filter(res => res !== undefined),
      catchError((err: Error) => this.throw401Alert(err))
    );
  }

  private throw401Alert(error: Error) {
    if (error['status'] === 401) {
      alert('Session has expired... Please refresh to Sign-In again!!');
      try {
        sessionStorage.clear();
        localStorage.clear();
      } catch (error) {}
      location.reload();
    }
    return throwError('Error:' + error.message);
  }
  private createHttpParams(params: any, useCache?: boolean): HttpParams {
    let httpParams = new HttpParams();
    _.forEach(params, (val, key) => {
      httpParams = httpParams.set(key, val);
    });
    return httpParams;
  }

  private catchProgressEvents(event: HttpEvent<any>, reportProgress: boolean, returnFullObject: boolean = false) {
    switch (event.type) {
      case HttpEventType.Sent:
        break;
      case HttpEventType.Response:
        return returnFullObject ? event : event.body;
    }
  }
}

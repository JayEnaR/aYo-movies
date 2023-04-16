import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, catchError, of } from 'rxjs';
import { ConfigService } from './config.service';

/**
 * Base service for handling all generic http requests and handle the errors
 */

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  private errorResponseSrc = new Subject<string>();
  errorResponse$ = this.errorResponseSrc.asObservable();

  constructor(public httpClient: HttpClient,
    @Inject(ConfigService) private _apiEndpointUrl: string) {

  }

  protected Get<T>(param: string): Observable<T> {
    return this.httpClient.get<T>(this._apiEndpointUrl + param)
      .pipe(
        catchError(e => this.handleError(e))
      );
  }

  // Optionally use Postman to prevent hitting the daily quota for api calls
  protected GetMochData<T>(param: string): Observable<T> {
    return this.httpClient.get<T>("https://61eb7e51-31b0-4acb-840e-975cf4fe488e.mock.pstmn.io")
      .pipe(
        catchError(e => this.handleError(e))
      );
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    // Could display some notification to the user here
    this.errorResponseSrc.next(e.message);
    return of(e);
  }
}

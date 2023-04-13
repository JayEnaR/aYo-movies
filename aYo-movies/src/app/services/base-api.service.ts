import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(public httpClient: HttpClient, @Inject(ConfigService) private _apiEndpointUrl: string) {

  }

  protected Get<T>(param: string): Observable<T> {
    return this.httpClient.get<T>(this._apiEndpointUrl + param)
      .pipe(
        catchError(e => this.handleError(e))
      );
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    // Do with e as you wish to display
    return of(e);
  }
}

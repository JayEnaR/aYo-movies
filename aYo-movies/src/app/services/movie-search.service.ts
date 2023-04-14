import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MochApiService } from './moch-api.service';

/**
 *  A service for retrieving movies
 */
@Injectable({
  providedIn: 'root'
})
export class MovieSearchService extends BaseApiService {

  constructor(private _httpClient: HttpClient,
    private configService: ConfigService,
    private _mochApiService: MochApiService) {
    super(_httpClient, configService.apiBaseUrl);
  }

  getMovie(param: string): Observable<any> {
    param = `?apikey=${this._mochApiService.apiKey}/${param}`;
    return super.Get(param);
  }
}

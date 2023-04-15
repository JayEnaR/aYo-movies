import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap, of, BehaviorSubject } from 'rxjs';
import { MochApiService } from './moch-api.service';
import { ISearchResult } from '../models/ISearchResult';
import { IResponse } from '../models/IResponse';

/**
 *  A service for retrieving movies
 */
@Injectable({
  providedIn: 'root'
})
export class AudioVisualSearchService extends BaseApiService {

  private cinemaSrc = new Subject<IResponse<ISearchResult[]>>();

  get cinema$(): Observable<IResponse<ISearchResult[]>> {
    return this.cinemaSrc.asObservable();
  }

  set cinema(item: IResponse<ISearchResult[]>) {
    this.cinemaSrc.next(item);
  }

  constructor(private _httpClient: HttpClient,
    private configService: ConfigService,
    private _mochApiService: MochApiService) {
    super(_httpClient, configService.apiBaseUrl);
    
  }

  // Retrieve audiovisual media from api
  retrieveCinemas(param: string): Observable<IResponse<ISearchResult[]>> {
    // Build the parameter
    param = `?apikey=${this._mochApiService.apiKey}&${param}`;
    return super.GetMochData<IResponse<ISearchResult[]>>(param).pipe(switchMap(res => {
      // Initialize the accessor
      this.cinema = res;
      return of(res);
    }));
  }
}

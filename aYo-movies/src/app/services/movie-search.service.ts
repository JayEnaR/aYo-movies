import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap, of } from 'rxjs';
import { MochApiService } from './moch-api.service';
import { ISearchResult } from '../models/ISearchResult';

/**
 *  A service for retrieving movies
 */
@Injectable({
  providedIn: 'root'
})
export class MovieSearchService extends BaseApiService {

  private cinemaSrc: Subject<ISearchResult> = new Subject<ISearchResult>();

  get cinema$(): Observable<ISearchResult> {
    return this.cinemaSrc.asObservable();
  }

  set cinema(item: ISearchResult){
    this.cinemaSrc.next(item);
  }

  constructor(private _httpClient: HttpClient,
    private configService: ConfigService,
    private _mochApiService: MochApiService) {
    super(_httpClient, configService.apiBaseUrl);
  }

  // Retrieve audiovisual media from api
  retrieveCinema(param: string): Observable<ISearchResult> {
    // Empty the subject for subscirbers to do conditional checking if needed
    this.cinemaSrc.next({} as ISearchResult);
    param = `?apikey=${this._mochApiService.apiKey}&${param}`;
    return super.Get<ISearchResult>(param).pipe(switchMap(res => {
      // Initialize the accessor
      this.cinema = res;
      return of(res);
    }));
  }
}

import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap, of, BehaviorSubject } from 'rxjs';
import { MochApiService } from './moch-api.service';
import { ISearchResult } from '../models/ISearchResult';
import { IResponse } from '../models/IResponse';
import { QueryTypeEnum } from '../enums/query-type.enum';

/**
 *  A service for retrieving movies
 */
@Injectable({
  providedIn: 'root'
})
export class AudioVisualSearchService extends BaseApiService {

  private queryType: QueryTypeEnum = QueryTypeEnum.movie;
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
  retrieveCinemas(param: string, queryType: QueryTypeEnum): Observable<IResponse<ISearchResult[]>> {
    // Build the parameter first
    this.queryType = queryType;
    const query = this.initializeQuery(param);
    param = `?apikey=${this._mochApiService.apiKey}&${query}`;
    return super.Get<IResponse<ISearchResult[]>>(param).pipe(switchMap(res => {
      // First clear the result
      this.cinema = {} as IResponse<ISearchResult[]>;
      // Initialize the accessor
      this.cinema = res;
      return of(res);
    }));
  }

  // Retrieve audiovisual media from api
  retrieveCinemasPaging(param: string): Observable<IResponse<ISearchResult[]>> {
    // Build the parameter
    param = `?apikey=${this._mochApiService.apiKey}&${param}`;
    return super.Get<IResponse<ISearchResult[]>>(param).pipe(switchMap(res => {
      // Initialize the accessor
      this.cinema = res
      return of(res);
    }));
  }

  // Builds the appropriate query based on audiovisual type
  private initializeQuery(name: string): string {
    switch (this.queryType) {
      case QueryTypeEnum.movie: {
        name = `type=movie&s=${name}`;
        break;
      }
      case QueryTypeEnum.series: {
        name = `type=series&s=${name}`;
        break;
      }
      case QueryTypeEnum.episode: {
        name = `type=episode&s=${name}`;
        break;
      }
    }
    return name;
  }
}

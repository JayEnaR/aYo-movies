import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap, of, BehaviorSubject } from 'rxjs';
import { MockApiService } from './mock-api.service';
import { ISearchResult } from '../models/ISearchResult';
import { IResponse } from '../models/IResponse';
import { QueryTypeEnum } from '../enums/query-type.enum';
import { SnackbarService } from './snackbar.service';
import { SnackbarTypeEnum } from '../enums/snackbar-type.enum';

/**
 *  A service for retrieving movies
 */
@Injectable({
  providedIn: 'root'
})
export class AudioVisualSearchService extends BaseApiService {

  private queryType: QueryTypeEnum = QueryTypeEnum.movie;
  private searchPhrase: string = "";
  private cinemaSrc = new Subject<IResponse<ISearchResult[]>>();

  get cinema$(): Observable<IResponse<ISearchResult[]>> {
    return this.cinemaSrc.asObservable();
  }

  set cinema(item: IResponse<ISearchResult[]>) {
    this.cinemaSrc.next(item);
  }

  constructor(private _httpClient: HttpClient,
    private configService: ConfigService,
    private _MockApiService: MockApiService,
    private _snackBarService: SnackbarService) {
    super(_httpClient, configService.apiBaseUrl);

    // Handle/display errors from base api service
    this.errorResponse$.subscribe(e => {
      this._snackBarService.showSnackBar(e, SnackbarTypeEnum.error, 5000);
    });
  }

  /**
* Retrieve audiovisual media from api
* @param number title of the audiovisual
* @param QueryTypeEnum The type of audiovisual
* @return - Returns a list of the audiovisuals
*/
  retrieveCinemas(phrase: string, queryType: QueryTypeEnum): Observable<IResponse<ISearchResult[]>> {
    // Only initial searches can initialize phrase and query type
    this.searchPhrase = phrase;
    this.queryType = queryType;
    // Build the parameter first
    const query = this.initializeQuery(phrase);
    phrase = `?apikey=${this._MockApiService.apiKey}&${query}`;
    return super.Get<IResponse<ISearchResult[]>>(phrase).pipe(switchMap(res => {
      // First clear the result
      this.cinema = {} as IResponse<ISearchResult[]>;
      // Initialize the accessor
      this.cinema = res;
      return of(res);
    }));
  }

  /**
 * Retrieve audiovisual media from api
 * @param number Page number of the audiovisual
 * @return - Returns a list of the audiovisuals
 */
  retrieveCinemasPaging(page: number): Observable<IResponse<ISearchResult[]>> {
    // Build the parameter
    const query = `type=movie&s=${this.searchPhrase}&page=${page}`;
    const param = `?apikey=${this._MockApiService.apiKey}&${query}`;
    return super.Get<IResponse<ISearchResult[]>>(param).pipe(switchMap(res => {
      // Initialize the accessor
      this.cinema = res
      return of(res);
    }));
  }

  /**
   * Send a custom greeting to a person.
   * @param string Title of the audiovisual
   * @return - Returns the details of the audiovisual
   */
  retrieveCinemaDetails(title: string): Observable<IResponse<ISearchResult>> {
    title = title.replaceAll(' ', '+');
    // Build the parameter
    const param = `?apikey=${this._MockApiService.apiKey}&t=${title}`;
    return super.Get<IResponse<ISearchResult>>(param);
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

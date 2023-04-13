import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService extends BaseApiService {

  constructor(private _httpClient : HttpClient,
    private configService: ConfigService) { 
      super(_httpClient, configService.apiBaseUrl)
    }

    getMovie(param: string) : Observable<any> {
      return super.Get(param);
    }
}

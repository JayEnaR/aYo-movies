import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IResponse } from 'src/app/models/IResponse';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { AudioVisualSearchService } from 'src/app/services/audio-visual-search.service';

@Injectable({
  providedIn: 'root'
})
export class AudioVisualDetailsResolver implements Resolve<IResponse<ISearchResult>> {
  constructor(private _audioVisualService: AudioVisualSearchService) { 
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResponse<ISearchResult>> {
    let queryParam: string = route.params['title'];
    if(queryParam){
      queryParam = queryParam.replaceAll(' ', '+');
      return this._audioVisualService.retrieveCinemaDetails(queryParam);
    }
    return of();
  }
}

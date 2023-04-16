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
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AudioVisualDetailsResolver implements Resolve<IResponse<ISearchResult>> {
  constructor(private _audioVisualService: AudioVisualSearchService,
    private _progressBarService: ProgressBarService) { 
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResponse<ISearchResult>> {
    this._progressBarService.showProgress(true);
    let queryParam: string = route.params['title'];
    if(queryParam){
      return this._audioVisualService.retrieveCinemaDetails(queryParam);
    }
    return of();
  }
}

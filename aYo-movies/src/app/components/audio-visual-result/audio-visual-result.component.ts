import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { AudioVisualSearchService } from 'src/app/services/audio-visual-search.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { IndexedDbService } from "../../services/indexed-db.service";
import { animations } from 'src/app/animations/public-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio-visual-result',
  templateUrl: './audio-visual-result.component.html',
  styleUrls: ['./audio-visual-result.component.scss'],
  animations: animations,
  host: { '[@fadeInOut]': '' }
})
export class AudioVisualResultComponent implements OnInit, OnDestroy {

  private unsub: Subject<void> = new Subject<void>();
  audioVisuals: ISearchResult[] = [];
  result: string = "";

  // Scrolling
  scrollDistance: number = 1;
  throttle: number = 300;
  pagesRequested: number = 1;

  constructor(private _movieSearchService: AudioVisualSearchService,
    private _progressBarService: ProgressBarService,
    private _indexedDbService: IndexedDbService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this.initAudioVisuals();
  }

  initAudioVisuals(): void {
    this._movieSearchService.cinema$.pipe(takeUntil(this.unsub))
      .subscribe(res => {
        // Only show item(s) when the response is truthy
        this.result = "";
        if (Object.keys(res).length == 0) {
          this.audioVisuals = [];
        } else {
          res.Response == "True" ?
            res.Search.forEach(a => { this.audioVisuals.push(a) }) :
            this.result = "No search results";
        }
      });
  }

  onScrollDown(): void {
    // Call API
    this._progressBarService.showProgress(true);
    this.pagesRequested += 1;
    const unsub = new Subject<void>();
    this._movieSearchService.retrieveCinemasPaging(this.pagesRequested).pipe(takeUntil(unsub)).subscribe(() => {
      this._progressBarService.showProgress(false);
      unsub.next();
      unsub.complete();
    });
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete();
  }

  watchLater(item: ISearchResult): void {
    this._indexedDbService.addAudioVisual(item);
  }

  navigate(title: string): void {
    this._router.navigate([`view-details/${title}`]);
  }
  

}

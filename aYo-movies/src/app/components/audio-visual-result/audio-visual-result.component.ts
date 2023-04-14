import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { AudioVisualSearchService } from 'src/app/services/movie-search.service';

@Component({
  selector: 'app-audio-visual-result',
  templateUrl: './audio-visual-result.component.html',
  styleUrls: ['./audio-visual-result.component.scss']
})
export class AudioVisualResultComponent implements OnInit, OnDestroy {

  private unsub: Subject<void> = new Subject<void>();
  audioVisuals: ISearchResult[] = [];
  result: string = "";

  constructor(private _movieSearchService: AudioVisualSearchService) {
  }

  ngOnInit(): void {
    this.initAudioVisuals();
  }

  initAudioVisuals(): void {
    this._movieSearchService.cinema$.pipe(takeUntil(this.unsub))
      .subscribe(res => {
        // Only show item(s) when the response is truthy
        this.result = "";
        this.audioVisuals = [];
        res.Response == "True" ? this.audioVisuals.push(res) : this.result = "No items";
      });
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete();
  }
}

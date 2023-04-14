import { Component, OnInit } from '@angular/core';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { AudioVisualSearchService } from 'src/app/services/movie-search.service';

@Component({
  selector: 'app-audio-visual-result',
  templateUrl: './audio-visual-result.component.html',
  styleUrls: ['./audio-visual-result.component.scss']
})
export class AudioVisualResultComponent implements OnInit {

  audioVisuals: ISearchResult[] = [];
  isSpinning: boolean = false;

  constructor(private _movieSearchService: AudioVisualSearchService) { 
  }

  ngOnInit(): void {
    this.initAudioVisuals();
  }

  initAudioVisuals(): void {
    this.audioVisuals = [];
    this._movieSearchService.cinema$.subscribe(res => {
      this.audioVisuals.push(res);
    });
  }

}

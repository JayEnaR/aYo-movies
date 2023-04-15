import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animations } from 'src/app/animations/public-api';
import { QueryTypeEnum } from 'src/app/enums/query-type.enum';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { AudioVisualSearchService } from 'src/app/services/audio-visual-search.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-audio-visual-details',
  templateUrl: './audio-visual-details.component.html',
  styleUrls: ['./audio-visual-details.component.scss'],
  animations: animations,
  host: { '[@fadeInOut]': '' }
})
export class AudioVisualDetailsComponent implements OnInit {

  audioVisual!: ISearchResult;

  constructor(private _activatedRoute: ActivatedRoute,
    private _progressBarService: ProgressBarService) { 
  }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ audiovisual }) => {
      this.audioVisual = audiovisual;
      this._progressBarService.showProgress(false);
    });
  }


}

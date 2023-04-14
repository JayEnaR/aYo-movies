import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  isProgressVisible: boolean = false;

  constructor(private _progressBarService: ProgressBarService) { 
    this._progressBarService.isProgressVisible$.subscribe(res => {
      this.isProgressVisible = res;
    });
  }

  ngOnInit(): void {
  }

}

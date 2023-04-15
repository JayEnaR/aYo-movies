import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from "../../services/indexed-db.service";
import { ISearchResult } from 'src/app/models/ISearchResult';
import { animations } from 'src/app/animations/public-api';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss'],
  animations: animations,
  host: {'[@fadeInOut]': ''}
})
export class WatchLaterComponent implements OnInit {

  identifyList(index: number, list: ISearchResult) {
    return `${list.imdbID}`;
  }

  constructor(public _indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
  }

  watchLater (item: ISearchResult): void {
    this._indexedDbService.deleteAudioVisual(item);
  }
}

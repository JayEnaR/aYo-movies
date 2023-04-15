import { Injectable } from '@angular/core';
import { ISearchResult } from '../models/ISearchResult';
import Dexie from "dexie";
import { liveQuery } from 'dexie';
import { SnackbarService } from './snackbar.service';
import { SnackbarTypeEnum } from '../enums/snackbar-type.enum';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService extends Dexie {

  audioVisualFavorites$ = liveQuery(() => this.audioVisualFavoritesCtx.toArray());
  audioVisualFavoritesCtx!: Dexie.Table<ISearchResult, string>;

  constructor(private _snackBarService: SnackbarService) { 
    super('audiovisual');
    this.version(2).stores({
      audioVisualFavoritesCtx: "imdbID,Title,Type,Year,Poster",
  });
  }

  addAudioVisual(audioVisual: ISearchResult): void {
    this.audioVisualFavoritesCtx.add(audioVisual);
    this._snackBarService.showSnackBar("Item added", SnackbarTypeEnum.success, 5000);
  }

  deleteAudioVisual(audioVisual: ISearchResult): void {
    this.audioVisualFavoritesCtx.delete(audioVisual.imdbID);
    this._snackBarService.showSnackBar("Item deleted", SnackbarTypeEnum.success, 5000);
  }
}

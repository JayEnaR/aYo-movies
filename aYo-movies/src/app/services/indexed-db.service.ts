import { Injectable } from '@angular/core';
import { ISearchResult } from '../models/ISearchResult';
import Dexie from "dexie";
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService extends Dexie {

  audioVisualFavorites$ = liveQuery(() => this.audioVisualFavoritesCtx.toArray());
  audioVisualFavoritesCtx!: Dexie.Table<ISearchResult, string>;

  constructor() { 
    super('audiovisual');
    this.version(2).stores({
      audioVisualFavoritesCtx: "imdbID,Title,Type,Year,Poster",
  });
  }

  addAudioVisual(audioVisual: ISearchResult): void {
    this.audioVisualFavoritesCtx.add(audioVisual);
  }

  deleteAudioVisual(audioVisual: ISearchResult): void {
    this.audioVisualFavoritesCtx.delete(audioVisual.imdbID);
  }
}

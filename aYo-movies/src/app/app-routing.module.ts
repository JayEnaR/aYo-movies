import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioVisualSearchComponent } from './components/audio-visual-search/audio-visual-search.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';

const routes: Routes = [
  { path: '', component: AudioVisualSearchComponent },
  { path: 'watch-later', component: WatchLaterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

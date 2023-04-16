import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioVisualSearchComponent } from './components/audio-visual-search/audio-visual-search.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';
import { AudioVisualDetailsComponent } from './components/audio-visual-details/audio-visual-details.component';
import { AudioVisualDetailsResolver } from './components/audio-visual-details/audio-visual-details.resolver';

const routes: Routes = [
  { path: '', component: AudioVisualSearchComponent },
  { path: 'search/:title/:type', component: AudioVisualSearchComponent },
  { path: 'watch-later', component: WatchLaterComponent },
  {
    path: 'view-details/:title', component: AudioVisualDetailsComponent, resolve: {
      audiovisual: AudioVisualDetailsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

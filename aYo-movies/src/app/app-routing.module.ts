import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioVisualSearchComponent } from './components/audio-visual-search/movie-search.component';

const routes: Routes = [
  {path: '', component: AudioVisualSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

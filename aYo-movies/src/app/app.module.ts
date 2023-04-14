import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./modules/shared.module";
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AudioVisualSearchComponent } from './components/audio-visual-search/audio-visual-search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AudioVisualResultComponent } from './components/audio-visual-result/audio-visual-result.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AudioVisualSearchComponent,
    SearchBarComponent,
    AudioVisualResultComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

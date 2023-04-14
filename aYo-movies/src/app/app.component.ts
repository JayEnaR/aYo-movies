import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'aYo-movies';
  isDarkMode: boolean = false;

  constructor(private _themeService: ThemeService) {
    this._themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }


}

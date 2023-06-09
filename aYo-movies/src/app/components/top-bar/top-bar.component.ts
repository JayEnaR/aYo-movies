import { Component, OnInit } from '@angular/core';
import { animations } from 'src/app/animations/public-api';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  animations: animations,
  host: {'[@fadeInOut]': ''}
})
export class TopBarComponent implements OnInit {

  isDarkMode: boolean = false;

  constructor(private _themeService: ThemeService) { }

  ngOnInit(): void {
    this._themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  onDarkModeToggle(): void {
    this.isDarkMode = (this.isDarkMode == true ? false : true);
    this._themeService.toggleDarkMode(this.isDarkMode);
  }
  
}

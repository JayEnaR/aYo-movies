import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkModeSrc : Subject<boolean> = new Subject<boolean>();
  isDarkMode$ = this.isDarkModeSrc.asObservable();

  constructor() { }

  toggleDarkMode(isDark: boolean): void {
    this.isDarkModeSrc.next(isDark);
    localStorage.setItem('darkMode', isDark.toString());
  }
}

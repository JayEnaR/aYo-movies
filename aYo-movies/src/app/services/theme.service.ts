import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkModeSrc : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  isDarkMode$ = this.isDarkModeSrc.asObservable();

  constructor() { 
    const isDark = JSON.parse(localStorage.getItem('darkMode')!) === true;
    this.toggleDarkMode(isDark);
   }

  toggleDarkMode(isDark: boolean): void {
    this.isDarkModeSrc.next(isDark);
    localStorage.setItem('darkMode', isDark.toString());
  }
}

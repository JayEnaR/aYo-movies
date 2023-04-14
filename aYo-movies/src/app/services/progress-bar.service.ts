import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private isProgressVisibleSrc = new BehaviorSubject<boolean>(false);
  isProgressVisible$ = this.isProgressVisibleSrc.asObservable();
  
  constructor() { }

  showProgress(show: boolean): boolean {
    this.isProgressVisibleSrc.next(show);
    return true;
  }
}

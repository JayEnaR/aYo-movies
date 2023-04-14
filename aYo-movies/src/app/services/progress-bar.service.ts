import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private isProgressVisibleSrc = new BehaviorSubject<boolean>(false);
  isProgressVisible$ = this.isProgressVisibleSrc.asObservable();
  
  constructor() { }

  showProgress(): boolean {
    this.isProgressVisibleSrc.next(true);
    return true;
  }
}

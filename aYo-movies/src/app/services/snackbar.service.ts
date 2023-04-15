import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarTypeEnum } from '../enums/snackbar-type.enum'

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  showSnackBar(msg: string, snackbarType: SnackbarTypeEnum, duration: number): void {
    let cssClass = "";
    switch(snackbarType){
      case SnackbarTypeEnum.ok: {
        cssClass = "app-snackSuccess";
        break;
      }
      case SnackbarTypeEnum.info: {
        cssClass = "app-snackInfo";
        break;
      }
      case SnackbarTypeEnum.warning: {
        cssClass = "app-snackWarn";
        break;
      }
      case SnackbarTypeEnum.error: {
        cssClass = "app-snackErr";
        break;
      }
    }
    
    this._snackBar.open(msg, "x", {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [cssClass, 'mat-primary'],
    });
  }

  hideSnackBar(): void {
    this._snackBar.dismiss();
  }
}

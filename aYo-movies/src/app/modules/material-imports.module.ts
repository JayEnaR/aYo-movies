import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class MaterialImportsModule { }

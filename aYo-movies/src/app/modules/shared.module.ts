import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportsModule } from "./material-imports.module";
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialImportsModule,
    CommonModule,
    MatFormFieldModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialImportsModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }

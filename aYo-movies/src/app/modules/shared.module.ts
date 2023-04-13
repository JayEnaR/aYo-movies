import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportsModule } from "./material-imports.module";

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialImportsModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialImportsModule
  ]
})
export class SharedModule { }

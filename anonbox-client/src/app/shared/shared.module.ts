import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
  /*
    NEVER provide services on shared modules
    User this for to add common components.
    Make sure the common component is declared in both the 'declarations'
    and 'exports' array.
  */
})
export class SharedModule {}

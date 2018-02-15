import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  exports: [
    CommonModule
  ]
  /*
    NEVER provide services on shared modules
    User this for to add common components.
    Make sure the common component is declared in both the 'declarations'
    and 'exports' array.
  */
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatInputModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})

export class MaterialModule {}

import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})

export class MaterialModule {}

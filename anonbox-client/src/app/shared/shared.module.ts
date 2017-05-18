import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [

	],
	exports: [
		CommonModule
	]
	/*NEVER provide services on shared modules*/
})
export class SharedModule {}

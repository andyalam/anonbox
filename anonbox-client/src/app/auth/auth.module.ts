import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
	],
	imports: [
		ReactiveFormsModule,
		AuthRoutingModule
	]
})
export class AuthModule {}

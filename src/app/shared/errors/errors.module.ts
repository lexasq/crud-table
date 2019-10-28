import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { ErrorsRoutingModule } from './errors-routing.module';
import { Error403Component } from './error403/error403.component';


@NgModule({
  declarations: [Error404Component, Error403Component],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }

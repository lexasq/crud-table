import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionGuard } from './app';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PermissionGuard
  ]
})
export class AuthModule {
}

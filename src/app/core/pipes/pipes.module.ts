import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentNamePipe } from './table/department.pipe';
import { ActivePipe } from './table/active.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DepartmentNamePipe,
    ActivePipe
  ],
  exports: [
    DepartmentNamePipe,
    ActivePipe
  ],
  providers: [
    DepartmentNamePipe,
    ActivePipe
  ]
})
export class PipesModule {
}

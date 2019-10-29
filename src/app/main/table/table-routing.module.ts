import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { TableFormComponent } from './table-form/table-form.component';
import { PermissionGuard } from '../../core/auth/guards';

const routes: Routes = [{
    path: '',
    component: TableComponent,
    canActivate: [PermissionGuard],
    data: {scopes: ['admin', 'basic']}
  }, {
    path: 'form',
    component: TableFormComponent,
    canActivate: [PermissionGuard],
    data: {scopes: ['admin']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }

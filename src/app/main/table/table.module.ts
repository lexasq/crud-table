import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFormComponent } from './table-form/table-form.component';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { PermissionGuard } from '../../core/auth/app';
import { MaterialModule } from '../../shared/material.module';
import { TableService } from './table.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreService} from '../../core/store/store.service';
import { PipesModule } from '../../core/pipes/pipes.module';

@NgModule({
  declarations: [
    TableComponent,
    TableFormComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
  ],
  providers: [
    PermissionGuard,
    TableService,
  ],
})
export class TableModule {
  constructor(private store: Store<any>,
              private storeService: StoreService) {
    this.storeService.initialStoreDataForTable(this.store);
  }
}

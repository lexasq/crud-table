import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeBackendProvider } from './core/interceptors/mock-backend.interceptor';
import { AuthService } from './core/services/auth.service';
import { Effects } from './core/store/effects';
import { Reducers } from './core/store/reducers';
import { StoreModule } from '@ngrx/store';
import { clearState } from './core/store/reducers/logout.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreService } from './core/store/store.service';
import { DepartmentsService } from './core/services/departments.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(Reducers,  {
      metaReducers: [clearState]
    }),
    EffectsModule.forRoot(Effects),
    MainModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    fakeBackendProvider,
    AuthService,
    DepartmentsService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

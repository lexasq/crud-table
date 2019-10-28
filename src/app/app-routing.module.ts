import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path: '',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: '**',
    loadChildren: './shared/errors/errors.module#ErrorsModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoltComponent } from './shared/layolt/layolt.component';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoltComponent,
    children: [
      {path: '', component: MainComponent}
      // loadChildren: (): => import('./').then(m => m..)
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

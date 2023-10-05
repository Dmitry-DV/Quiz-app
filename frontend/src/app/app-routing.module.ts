import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoltComponent } from './shared/layolt/layolt.component';
import { MainComponent } from './views/main/main.component';
import { authForwardGuard } from './core/auth/auth-forward.guard';
import { authGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoltComponent,
    children: [
      { path: '', component: MainComponent },
      {
        path: '',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
        canActivate: [authForwardGuard],
      },
      {
        path: '',
        loadChildren: () => import('./views/test/test.module').then(m => m.TestModule),
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

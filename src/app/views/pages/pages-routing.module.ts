import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LocalsComponent } from './locals/locals.component';

const routes: Routes = [
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
      path: 'locals',
      component: LocalsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

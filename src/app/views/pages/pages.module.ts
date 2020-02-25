import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalsComponent } from './locals/locals.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PagesRoutingModule
  ],
  declarations: [UserProfileComponent, LocalsComponent]
})
export class PagesModule { }

import { NgModule } from '@angular/core';

import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [ RouterModule ],
  exports: [
    NavbarComponent
  ],
  providers: [],
})
export class SharedModule {}

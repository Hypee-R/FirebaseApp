import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './full.component';
import { fullContentRoutes } from './full.routes';

const routes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: fullContentRoutes,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
    declarations: []
})
export class FullRoutingModule { }

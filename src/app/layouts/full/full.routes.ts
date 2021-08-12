import { Routes } from '@angular/router';


import { HomeComponent } from '../../pages/home/home.component';
import { TemplateComponent } from '../../pages/template/template.component';
import { ReactiveComponent } from '../../pages/reactive/reactive.component';
import { HeroesComponent } from '../../pages/heroes/heroes.component';
import { HeroeComponent } from '../../pages/heroe/heroe.component';

export const fullContentRoutes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'template',
      component: TemplateComponent,
    },
    {
        path: 'reactive',
        component: ReactiveComponent,
    },
    {
        path: 'heroes',
        component: HeroesComponent,
    },
    {
        path: 'heroe/:id',
        component: HeroeComponent,
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: 'home'
    }


];

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';

import { TemplateComponent } from './template/template.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FullRoutingModule } from '../layouts/full/full-routing.module';
import { FullComponent } from '../layouts/full/full.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroeComponent } from './heroe/heroe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FullRoutingModule,
  ],
  declarations: [
    FullComponent,
    HomeComponent,
    TemplateComponent,
    ReactiveComponent,
    HeroesComponent,
    HeroeComponent,
  ],
  providers: []
})

export class PagesModule { }

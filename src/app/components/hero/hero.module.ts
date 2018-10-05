import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import  {HeroesComponent} from './hero.component';

@NgModule({
  imports: [
    CommonModule,
    HeroRoutingModule
  ],
  declarations: [HeroesComponent]
})
export class HeroModule { }

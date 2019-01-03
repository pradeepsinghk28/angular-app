import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroRoutingModule } from './hero-routing.module';
import { HeroesComponent } from './hero.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeroRoutingModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [ HeroesComponent ]
})
export class HeroModule { }

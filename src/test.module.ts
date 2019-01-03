import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpClientTestingModule,
    RouterTestingModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  exports:[
    CommonModule,
    HttpClientTestingModule,
    RouterTestingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class TestModule { }

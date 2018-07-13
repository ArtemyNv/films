import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'

import { FilmsRoutingModule } from './films-routing.module';
import { ListComponent } from './list/list.component';
import { FilmService } from './film.service';
import { FilmDetailComponent } from './film-detail/film-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FilmsRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  providers: [FilmService],
  declarations: [ListComponent, FilmDetailComponent]
})
export class FilmsModule { }

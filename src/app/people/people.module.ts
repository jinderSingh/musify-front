import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PeopleFormComponent } from './people-form/people-form.component';
import { PeopleComponent } from './people.component';
import { peopleRoutes } from './people.routes';
import { PeopleService } from './services/people.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(peopleRoutes)
  ],
  declarations: [PeopleComponent, PeopleFormComponent],
  providers: [PeopleService]
})
export class PeopleModule {}

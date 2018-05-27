import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeopleQueryService } from './shared-services/people-query.service';
import { StylesQueryService } from './shared-services/styles-query.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [PeopleQueryService, StylesQueryService]

})
export class SharedServicesModule {}

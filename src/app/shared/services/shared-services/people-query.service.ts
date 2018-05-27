import { Injectable } from '@angular/core';
import { QueryService } from './../../../commons/services/query.service';
@Injectable()
export class PeopleQueryService extends QueryService<any> {

  protected readonly API_URI = '/musify/people';

}

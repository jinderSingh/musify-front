import { Injectable } from '@angular/core';
import { CrudService } from '../../commons/services/crud.service';
import { PeopleType } from './../models/people.type';
@Injectable()
export class PeopleService extends CrudService<PeopleType> {
    protected readonly API_URI = '/musify/people';

}

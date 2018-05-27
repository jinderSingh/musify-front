import { Injectable } from '@angular/core';
import { QueryService } from './../../../commons/services/query.service';
@Injectable()
export class StylesQueryService extends QueryService < any > {

  protected readonly API_URI = '/musify/styles';

}

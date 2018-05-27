import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrudService } from './../../commons/services/crud.service';
import { ArtistType } from './../models/artist.type';
@Injectable()
export class ArtistService extends CrudService<ArtistType> {

    protected readonly API_URI = '/musify/artists';
    private readonly FILTER_URI = '/filter';

    getAll(): Observable<ArtistType[]> {
        return this.httpClient.get<ArtistType[]>(this.API_URI)
            .pipe(catchError(this.handleError('Get all')));
    }

    filter(artistFilter: any): Observable<ArtistType[]> {
        const httpParams = new HttpParams({ fromObject: artistFilter });
        const url = `${this.API_URI}${this.FILTER_URI}`;
        return this.httpClient.get<ArtistType[]>(url, {params: artistFilter})
        .pipe(catchError(this.handleError('Filter')));
    }

}

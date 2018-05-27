import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class QueryService<T> {

    protected readonly API_URI: string;

    constructor(protected httpClient: HttpClient) {
    }

    getAll(url?: string): Observable<T> {
        return this.httpClient.get<T>(url || this.API_URI)
            .pipe(catchError(this.handleError('Get all')));
    }

    protected handleError(operation = 'operation') {
      return (error: any): Observable < any > => {
        console.error(`${operation} failed: ${error.message}`);
        return throwError(error);
      };
    }


}

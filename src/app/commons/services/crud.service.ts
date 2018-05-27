import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class CrudService < T > {

  protected readonly API_URI: string;

  constructor(protected httpClient: HttpClient) {}

  add(body: T, url ? : string): Observable < T > {
    return this.httpClient.post < T > (url || this.API_URI, body)
      .pipe(catchError(this.handleError('Post')));
  }

  put(id: number, body: T, url ? : string): Observable < T > {
    return this.httpClient.put < T > (`${url || this.API_URI}/${id}`, body)


      .pipe(catchError(this.handleError('Put')));
  }

  delete(id: number, url ? : string): Observable < T > {
    return this.httpClient.delete < T > (`${url || this.API_URI}/${id}`)
      .pipe(catchError(this.handleError('Delete')));
  }

  getById(id: number, url ? : string): Observable < T > {
    return this.httpClient.get < T > (`${url || this.API_URI}/${id}`)

      .pipe(catchError(this.handleError('Get')));
  }

  protected handleError(operation = 'operation') {
    return (error: any): Observable < any > => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error.error);
    };
  }


}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtistService } from '../services/artist-service';
import { ArtistType } from './../models/artist.type';

@Injectable()
export class ArtistResolver implements Resolve < ArtistType > {

  constructor(private artistService: ArtistService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < ArtistType > {
    const {
      id
    } = route.params;

    return this.artistService.getById(id);
  }
}

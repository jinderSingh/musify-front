import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, first, switchMap, takeWhile } from 'rxjs/operators';
import { DataTableType } from './../models/data-table.type';
import { ArtistType } from './models/artist.type';
import { ArtistService } from './services/artist-service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {

  artistList: ArtistType[];
  searchFormControl: FormControl;
  msgClassName: string;
  msg: string;


  private isAlive = true;

  constructor(private artistService: ArtistService) {}


  ngOnInit() {
    this.buildFormControl();
    this.findAllAndSetArtists();
    this.formControlSubscription();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  delete(artist: ArtistType) {
    this.artistService
      .delete(artist.id)
      .pipe(
        first()
      )
      .subscribe(
        value => this.findAllAndSetArtists(),
        error => this.handleError(error)
      );
  }


  private handleError(error) {
    this.msgClassName = this.errorClassName;
    this.msg = `Error occurred '${error.message}'.`;
  }

  get successClassName(): string {
    return 'alert-success';
  }

  get errorClassName(): string {
    return 'alert-danger';
  }

  get headers(): DataTableType[] {
    return [{
        field: 'name',
        header: 'Name'
      },
      {
        field: 'year',
        header: 'Year'
      }
    ];
  }

  private buildFormControl() {
    this.searchFormControl = new FormControl();
  }


  private formControlSubscription() {
    this.searchFormControl
      .valueChanges
      .pipe(
        distinctUntilChanged(),
        takeWhile(value => this.isAlive),
        switchMap(value => this.artistService.filter({
          style: value
        }))
      )
      .subscribe(
        value => this.setArtists( < ArtistType[] > value),
        error => this.handleError(error)
      );
  }


  private findAllAndSetArtists() {
    this.artistService
      .getAll()
      .pipe(first())
      .subscribe(
        artists => this.setArtists(artists),
        error => console.log(error)
      );
  }

  private setArtists(values: ArtistType[]) {
    this.artistList = values;
  }

}

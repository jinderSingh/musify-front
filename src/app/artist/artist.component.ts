import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile, switchMap, takeWhile } from 'rxjs/operators';
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
        takeWhile(value => this.isAlive)
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
        debounceTime(500),
        skipWhile(value => !value),
        takeWhile(value => this.isAlive),
        switchMap(value => value ? this.artistService.filter({
          style: value
        }) : of ([]))
      )
      .subscribe(
        value => this.setArtists( < ArtistType[] > value),
        error => console.log(error)
      );
  }


  private findAllAndSetArtists() {
    this.artistService
      .getAll()
      .pipe(takeWhile(values => this.isAlive))
      .subscribe(
        artists => this.setArtists(artists),
        error => console.log(error)
      );
  }

  private setArtists(values: ArtistType[]) {
    this.artistList = values;
  }

}

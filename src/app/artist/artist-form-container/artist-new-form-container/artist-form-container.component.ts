import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile, tap } from 'rxjs/operators';
import { FormValuesChangeType } from './../../../models/form-values-change.type';
import { ArtistType } from './../../models/artist.type';
import { ArtistService } from './../../services/artist-service';
@Component({
  selector: 'app-artist-form-container',
  templateUrl: './artist-form-container.component.html',
  styleUrls: ['./artist-form-container.component.scss']
})
export class ArtistFormContainerComponent implements OnInit, OnDestroy {

  artistToSave: FormValuesChangeType;
  msgClassName: string;
  msg: string;
  isSaving: boolean;


  private isAlive = true;

  constructor(private artistServie: ArtistService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.isAlive = false;
  }

  persist() {
    if (!this.isFormValid) {
      return;
    }
    this.isSaving = true;
    this.artistServie
      .add(this.artistToSave.value)
      .pipe(
        tap(val => this.isSaving = false),
        takeWhile(values => this.isAlive)
      )
      .subscribe(
        value => this.handleSuccess(value),
        error => this.handleError(error)
      );
  }

  onArtistFormComponentError(event) {
    this.msg = event.message;
    this.msgClassName = this.errorClassName;
  }

  private handleSuccess(artist: ArtistType) {
    this.msgClassName = this.successClassName;
    this.msg = `Artist with name '${artist.name}' created successfully.`;
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

  get isFormValid(): boolean {
    return this.artistToSave && this.artistToSave.valid;
  }


}

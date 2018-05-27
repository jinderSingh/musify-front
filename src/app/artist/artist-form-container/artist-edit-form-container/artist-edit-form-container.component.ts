import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';
import { FormValuesChangeType } from './../../../models/form-values-change.type';
import { ArtistType } from './../../models/artist.type';
import { ArtistService } from './../../services/artist-service';

@Component({
  selector: 'app-artist-edit-form-container',
  templateUrl: './artist-edit-form-container.component.html',
  styleUrls: ['./artist-edit-form-container.component.scss']
})
export class ArtistEditFormContainerComponent implements OnInit, OnDestroy {

  artistToSave: FormValuesChangeType;
  msgClassName: string;
  msg: string;
  artistEntity: ArtistType;
  isSaving: boolean;


  private artistId: number;
  private isAlive = true;

  constructor(private artistServie: ArtistService,
    private activeRoute: ActivatedRoute) {}

  ngOnInit() {

    this.artistEntity = this.activeRoute.snapshot.data['artist'];
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  persist() {
    if (!this.isFormValid) {
      return;
    }
    this.isSaving = true;
    const {
      value,
      value: {
        id
      }
    } = this.artistToSave;
    this.artistServie
      .put(id, value)
      .pipe(
        tap(values => this.isSaving = false),
        takeWhile(values => this.isAlive)
      )
      .subscribe(
        response => this.handleSuccess(response),
        error => this.handleError(error)
      );
  }
  onArtistFormComponentError(event) {
    this.msg = event.message;
    this.msgClassName = this.errorClassName;
  }


  private handleSuccess(artist: ArtistType) {
    this.msgClassName = this.successClassName;
    this.msg = `Artist with name '${artist.name}' updated successfully.`;
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

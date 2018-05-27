import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { delay, distinctUntilChanged, skipWhile, takeWhile, tap } from 'rxjs/operators';
import { StylesQueryService } from '../../../shared/services/shared-services/styles-query.service';
import { EntityType } from '../../models/entity.type';
import { ArtistService } from '../../services/artist-service';
import { FormValuesChangeType } from './../../../models/form-values-change.type';
import { PeopleType } from './../../../people/models/people.type';
import { ListItemType } from './../../../shared/components/shared-components/list-component/models/list-item.type';
import { PeopleQueryService } from './../../../shared/services/shared-services/people-query.service';
import { ArtistType } from './../../models/artist.type';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistFormComponent implements OnInit, OnDestroy {

  @Output() artistChanged: EventEmitter < FormValuesChangeType > = new EventEmitter();
  @Output() errorEvent: EventEmitter < HttpErrorResponse > = new EventEmitter();


  formGroup: FormGroup;
  peopleList: ListItemType[];
  artistList: ListItemType[];
  stylesList: ListItemType[];
  isFetching: boolean;

  private entityContainer: {
    [key: string]: {
      [key: number]: {}
    }
  };
  private isAlive = true;
  private _defaultValues: ArtistType;

  constructor(private fb: FormBuilder,
    private peopleQueryService: PeopleQueryService,
    private artistService: ArtistService,
    private stylesQueryService: StylesQueryService,
    private cd: ChangeDetectorRef) {
    const {
      PEOPLE_ENTITY: people,
      ARTIST_ENTITY: artist
    } = EntityType;
    this.initializeEntityContainer(people, artist);
    this.buildForm();
  }

  ngOnInit() {
    this.makeApiCalls();
    this.formSubscriptions();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  onPeopleSelected(people) {
    if (this.doesEntityContains(this.peopleEntity, people)) {
      return;
    }
    const formGroup = this.peopleAndArtistCommonFormGroup;
    formGroup.patchValue(people);
    this.peopleEntity[people.id] = people;
    this.peopleFormArray.push(formGroup);
  }

  onRelatedArtistSelected(artist) {
    if (this.doesEntityContains(this.artistEntity, artist)) {
      return;
    }

    const formGroup = this.peopleAndArtistCommonFormGroup;
    formGroup.patchValue(artist);
    this.artistEntity[artist.id] = artist;
    this.artistFormArray.push(formGroup);
  }

  removePeople(index: number, people: PeopleType) {
    this.peopleFormArray.removeAt(index);
    this.deleteFromEntity(this.peopleEntity, people);
  }

  removeArtist(index: number, artist: ArtistType) {
    this.artistFormArray.removeAt(index);
    this.deleteFromEntity(this.artistEntity, artist);
  }

  private initializeEntityContainer(...keys: string[]) {
    if (!keys) {
      this.entityContainer = {};
      return;
    }
    this.entityContainer = keys.reduce((prev, next) => {
      prev[next] = {};
      return prev;
    }, {});
  }

  private formSubscriptions() {
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeWhile(value => this.isAlive),
        skipWhile(value => this.formStatusIsDifferentFromValidAndInvalid)
      )
      .subscribe(values => this.artistChanged.emit(this.formValuesChangeType));

  }


  private buildForm(defaultValues ? : ArtistType) {
    this.formGroup = this.fb.group(this.formControls);

    if (defaultValues !== null && defaultValues !== undefined) {
      this.formGroup.patchValue(defaultValues);
    }
  }

  private makeApiCalls() {
    this.isFetching = true;
    forkJoin(this.listOfApiCalls)
      .pipe(
        delay(500),
        tap(values => this.isFetching = false),
        takeWhile(values => this.isAlive)
      )
      .subscribe(
        values => {
          this.peopleList = values[0];
          this.artistList = values[1];
          this.stylesList = values[2];
          this.cd.markForCheck();
        },
        error => this.handleError(error)
      );
  }

  private handleError(error) {
    this.isFetching = false;
    this.errorEvent.emit(error);
  }

  private doesEntityContains(entity, value): boolean {
    const item = entity[value.id];
    return item !== null && item !== undefined;
  }

  private deleteFromEntity(entity, value) {
    delete entity[value.id];
  }

  private addToFormArray(values: any[], formArrayName: string) {
    if (!values) {
      return;
    }
    values.forEach(value => {
      (this.formGroup.get(formArrayName) as FormArray).push(
        this.peopleAndArtistCommonFormGroup
      );
    });

  }

  private insertIntoEntityContainer(entityName, values: {}[]) {
    if (!this.entityContainer[entityName]) {
      this.entityContainer[entityName] = {};
    }
    const entity = this.entityContainer[entityName];

    this.entityContainer[entityName] = values.reduce((prev, next) => {
      prev[next['id']] = next;
      return prev;
    }, entity);
  }


  @Input()
  set defaultValues(artist: ArtistType) {
    this._defaultValues = artist;
    if (this.formGroup) {
      this.addToFormArray(this.defaultValues.people, 'people');
      this.addToFormArray(this.defaultValues.relatedArtists, 'relatedArtists');
      this.formGroup.patchValue(this.defaultValues);
    }
    this.insertIntoEntityContainer(EntityType.PEOPLE_ENTITY, artist.people);
    this.insertIntoEntityContainer(EntityType.PEOPLE_ENTITY, artist.relatedArtists);
  }

  get defaultValues() {
    return this._defaultValues;
  }


  get listOfApiCalls() {
    return [
      this.peopleQueryService.getAll(),
      this.artistService.getAll(),
      this.stylesQueryService.getAll(),
    ];
  }

  get formValuesChangeType(): FormValuesChangeType {
    const {
      valid,
      touched,
      dirty,
      value
    } = this.formGroup;
    return {
      valid,
      touched,
      dirty,
      value
    };
  }

  get formStatusIsDifferentFromValidAndInvalid(): boolean {
    return this.formGroup.status !== 'INVALID' && this.formGroup.status !== 'VALID';
  }


  get formControls(): {
    [key: string]: any
  } {
    return {
      id: [null],
      name: [null],
      year: [null],
      people: this.formArray,
      styles: [null],
      relatedArtists: this.formArray
    };
  }

  get formArray(): FormArray {
    return this.fb.array([]);
  }


  get peopleFormArray(): FormArray {
    return this.formGroup.get('people') as FormArray;
  }


  get artistFormArray(): FormArray {
    return this.formGroup.get('relatedArtists') as FormArray;
  }

  get peopleAndArtistCommonFormGroup() {
    return this.fb.group({
      id: [null],
      name: [null],
      year: [null]
    });
  }

  get minYear(): number {
    return 1970;
  }

  get peopleEntity(): {
    [id: number]: {}
  } {
    return this.entityContainer[EntityType.PEOPLE_ENTITY];
  }

  get artistEntity(): {
    [id: number]: {}
  } {
    return this.entityContainer[EntityType.ARTIST_ENTITY];
  }

  get totalPeopleSelected(): number {
    return this.peopleFormArray ? this.peopleFormArray.length : 0;
  }

  get totalArtistSelected(): number {
    return this.artistFormArray ? this.artistFormArray.length : 0;
  }
}

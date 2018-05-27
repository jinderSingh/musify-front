import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile, tap } from 'rxjs/operators';
import { FormValuesChangeType } from './../models/form-values-change.type';
import { PeopleType } from './models/people.type';
import { PeopleService } from './services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {


  peopleToSave: FormValuesChangeType;
  msgClassName: string;
  msg: string;
  error: boolean;
  isSaving: boolean;

  private isAlive = true;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.isAlive = false;
  }

  persist() {
    this.error = false;
    if (!this.isFormValid) {
      return;
    }
    this.isSaving = true;
    this.peopleService
      .add(this.peopleToSave.value)
      .pipe(
        tap(values => this.isSaving = false),
        takeWhile(values => this.isAlive)
      )
      .subscribe(
        people => this.handleSuccess(people),
        error => this.handleError(error)
      );
  }


  private handleSuccess(people: PeopleType) {
    this.msgClassName = this.successClassName;
    this.msg = `Person with name '${people.name}' created successfully.`;
  }

  private handleError(error) {
    this.isSaving = false;
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
    return this.peopleToSave && this.peopleToSave.valid;
  }
}

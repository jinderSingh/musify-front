import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, skipWhile, takeWhile } from 'rxjs/operators';
import { FormValuesChangeType } from './../../models/form-values-change.type';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit, OnDestroy {


  @Output() peopleChanged: EventEmitter<FormValuesChangeType> = new EventEmitter();

  formGroup: FormGroup;

  private isAlive = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.peopleChanged.emit(this.formValuesChangeType);
    this.formSubscriptions();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  private formSubscriptions() {
    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeWhile(value => this.isAlive),
        skipWhile(value => this.formStatusIsDifferentFromValidAndInvalid)
      )
      .subscribe(values => this.peopleChanged.emit(this.formValuesChangeType));

  }

  private buildForm() {
    this.formGroup = this.fb.group(this.formControls);
  }

  get formValuesChangeType(): FormValuesChangeType {
    const { valid, touched, dirty, value } = this.formGroup;
    return { valid, touched, dirty, value };
  }

  get formStatusIsDifferentFromValidAndInvalid(): boolean {
    return this.formGroup.status !== 'INVALID' && this.formGroup.status !== 'VALID';
  }

  get formControls(): {
    [key: string]: any
  } {
    return {
      id: [null],
      name: [null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }],

      year: [null]

    };
  }

  get minYear(): number {
    return 1970;
  }

  get isNameInvalidAndTouched(): boolean {
    const {
      invalid,
      touched
    } = this.formGroup.get('name');

    return invalid && touched;

  }

}

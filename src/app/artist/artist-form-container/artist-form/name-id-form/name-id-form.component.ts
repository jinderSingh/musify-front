import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-name-id-form',
  templateUrl: './name-id-form.component.html',
  styleUrls: ['./name-id-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameIdFormComponent implements OnInit {

  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}

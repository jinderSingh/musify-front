import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItemType } from './models/list-item.type';


@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponentComponent implements OnInit {

  @Input() displayLoadingIcon: boolean;

  @Output() itemSelectEvent: EventEmitter < ListItemType > = new EventEmitter < ListItemType > ();


  private _data: ListItemType[];
  constructor() {}

  ngOnInit() {}

  itemSelected(item: ListItemType) {
    this.itemSelectEvent.emit(item);
  }

  @Input()
  set data(values: ListItemType[]) {
    this._data = values;
  }

  get data() {
    return this._data;
  }

  get isDataDefined(): boolean {
    return this.data !== null && this.data !== undefined;
  }
}

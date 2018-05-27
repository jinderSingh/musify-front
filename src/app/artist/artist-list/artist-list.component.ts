import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArtistType } from '../models/artist.type';
import { DataTableType } from './../../models/data-table.type';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistListComponent implements OnInit {

  @Input() artistList;
  @Input() headers: DataTableType[];
  @Output() deleteArtist: EventEmitter<ArtistType> = new EventEmitter();

  private _emptyMsg = 'No data found';


  constructor() {}

  ngOnInit() { }

  delete(artist: ArtistType) {
    this.deleteArtist.emit(artist);
  }

  @Input()
  set emptyMsg(value: string) {
    if (value) {
      this._emptyMsg = value;
    }
  }

  get emptyMsg() {
    return this._emptyMsg;
  }

}

import {
  Routes
} from '@angular/router';

export const routes: Routes = [{
    path: 'people',
    loadChildren: './people/people.module#PeopleModule'
  },
  {
    path: 'artist',
    loadChildren: './artist/artist.module#ArtistModule'
  },
  {
    path: '',
    redirectTo: 'artist',
    pathMatch: 'full'
  }
];

import { Routes } from '@angular/router';
import { ArtistEditFormContainerComponent } from './artist-form-container/artist-edit-form-container/artist-edit-form-container.component';
import { ArtistFormContainerComponent } from './artist-form-container/artist-new-form-container/artist-form-container.component';
import { ArtistComponent } from './artist.component';
import { ArtistResolver } from './resolvers/artist.resolver';

export const artistRoutes: Routes = [{
  path: '',
  component: ArtistComponent
},
{
  path: 'new',
  component: ArtistFormContainerComponent
},
{
  path: 'edit/:id',
  component: ArtistEditFormContainerComponent,
  resolve: {artist: ArtistResolver}
},

];

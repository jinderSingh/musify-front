import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedServicesModule } from '../shared/services/shared-services.module';
import { SharedComponentsModule } from './../shared/components/shared-components.module';
import { ArtistEditFormContainerComponent } from './artist-form-container/artist-edit-form-container/artist-edit-form-container.component';
import { ArtistFormComponent } from './artist-form-container/artist-form/artist-form.component';
import { NameIdFormComponent } from './artist-form-container/artist-form/name-id-form/name-id-form.component';
import { ArtistFormContainerComponent } from './artist-form-container/artist-new-form-container/artist-form-container.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistComponent } from './artist.component';
import { artistRoutes } from './artist.routes';
import { ArtistResolver } from './resolvers/artist.resolver';
import { ArtistService } from './services/artist-service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedServicesModule,
    RouterModule.forChild(artistRoutes)
  ],
  declarations: [ArtistComponent, ArtistListComponent, ArtistFormContainerComponent, ArtistFormComponent,
    NameIdFormComponent, ArtistEditFormContainerComponent
  ],
  providers: [ArtistService, ArtistResolver]
})
export class ArtistModule {}

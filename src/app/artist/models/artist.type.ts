import { PeopleType } from './../../people/models/people.type';
export interface ArtistType {
  id ?: number;
  name ?: string;
  year?: number;
  people?: PeopleType[];
  styles?: any[];
  relatedArtists?: ArtistType[];
}

import { Facilities } from '../../../types/facilities.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';
import { City, Coordinates } from '../../../types/index.js';


export class CreateOfferDto {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewPhoto: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HouseType;
  roomCount: number;
  guestsCount: number;
  price: number;
  facilities: Facilities[];
  coordinates: Coordinates;
  authorId: string;
}

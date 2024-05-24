import { Expose } from 'class-transformer';
import { UserType } from '../../../types/index.js';


export class UserRdo {
  @Expose()
  public name: string;

  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarPath: string;

  @Expose()
  public password: string;

  @Expose()
  public type: UserType;
}

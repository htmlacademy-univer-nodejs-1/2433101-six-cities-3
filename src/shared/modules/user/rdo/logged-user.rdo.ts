import { Expose } from 'class-transformer';
import { UserType } from '../../../types';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarPath: string;

  @Expose()
  public name: string;

  @Expose()
  public type: UserType;
}

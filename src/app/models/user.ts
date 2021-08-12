import { ROLE } from '../constants/roles';
import { BaseModel } from './base.model';

export class User extends BaseModel {
  public userName: string;
  public firstName: string;
  public lastName: string;
  public role: ROLE;
}

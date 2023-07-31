export interface IUser {
  id: string;
  description?: string;
  isAdmin: boolean;
  username: string;
  email: string;
  user_registered: Date;
}
export interface IDBUser {
  _id: string;
  description?: string;
  isAdmin: boolean;
  isVisible?: boolean;
  username: string;
  firstName?: string;
  LastName?: string;
  email: string;
  password: string;
  picture?: string;
  about?: string;
  type: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  user_registered: Date;
  lastLogin: Date;
}

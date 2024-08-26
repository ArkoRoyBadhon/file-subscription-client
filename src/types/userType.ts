interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  downloadedItems: number;
  plan: string;
  planDate?: Date;
}

export interface IUserCreator {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  rolName: string;
  phone?: string;
  updatedAt?: string;
  createdAt?: string;
}

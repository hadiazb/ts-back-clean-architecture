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
  adress?: Adress[];
}

export interface Adress {
  id?: number;
  idUser?: number;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: number;
  updatedAt?: string;
  createdAt?: string;
}

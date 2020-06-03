import { AxiosError } from 'axios';

export interface IUserState {
  items: IUser[];
  loading: boolean;
  error: AxiosError | any;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface ISelectedUser {
  id: number;
  name: string;
}

interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface IGeo {
  lat: string;
  lng: string;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}


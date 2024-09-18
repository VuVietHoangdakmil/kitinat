export interface Store {
  key?: number;
  id?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  open_time?: string;
  close_time?: string;
  is_open?: boolean;
  images?: string;
  longitude?: number;
  latitude?: number;
  description?: string;
}
export interface StoreBody extends Required<Omit<Store, "id" | "key">> {
  id?: string;
}

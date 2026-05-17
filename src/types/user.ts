export type UserRole = "User" | "Admin" | "Inactive" | string;

export type Address = {
  state: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  gender: number;
  defaultAddress?: Address | null;
  defaultPaymentMethod?: number | null;
  role: UserRole;
  isActive?: boolean;
};

export type UserUpdateRequest = {
  name?: string;
  email?: string;
  password?: string;
  gender?: number;
  defaultAddress?: Address;
  defaultPaymentMethod?: number;
};
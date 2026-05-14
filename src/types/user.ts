export type UserRole = "User" | "Admin" | "Inactive" | string;

export type User = {
  id: string | number;
  name: string;
  email: string;
  role: UserRole;
  ordersCount?: number;
  isActive?: boolean;
};

export type UserCreateRequest = {
  name: string;
  email: string;
  password?: string;
};

export type UserUpdateRequest = {
  name?: string;
  email?: string;
  password?: string;
};
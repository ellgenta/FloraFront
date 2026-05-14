export type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalReviews: number;
};

export type RecentOrder = {
  id: string | number;
  customerName: string;
  total: number;
  status: string;
};

export type DashboardData = {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
};
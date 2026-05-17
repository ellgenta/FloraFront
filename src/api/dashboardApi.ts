import { productApi } from "./productApi";
import { orderApi } from "./orderApi";
import { userApi } from "./userApi";
import { reviewApi } from "./reviewApi";
import type { DashboardData } from "../types/dashboard";

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    const [products, orders, users, reviews] = await Promise.all([
      productApi.getAll(),
      orderApi.getAll(),
      userApi.getAll(),
      reviewApi.getAll(),
    ]);

    const recentOrders = orders.slice(0, 5).map((order) => ({
      id: order.id,
      customerName: `User #${order.userId}`,
      total: order.totalPrice,
      status: order.status === 0 ? "New"
            : order.status === 1 ? "Processing"
            : order.status === 2 ? "Completed"
            : order.status === 3 ? "Cancelled"
            : "Delivered",
    }));

    return {
      stats: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalReviews: reviews.length,
      },
      recentOrders,
    };
  },
};
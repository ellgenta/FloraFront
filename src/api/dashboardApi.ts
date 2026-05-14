import { http } from "./http";
import type { DashboardData } from "../types/dashboard";

export const dashboardApi = {
  getDashboardData: () => {
    return http<DashboardData>("/api/admin/dashboard");
  },
};

/*"/api/Admin/dashboard" <- заменить если на беке по другому называется*/
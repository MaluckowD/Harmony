import { apiClient } from "@/shared/api/client";

class UserApi {
  private baseUrl = 'api/auth';

  async getUserData() {
    return apiClient.get(`${this.baseUrl}/self`);
  }
}

export const userApi = new UserApi();
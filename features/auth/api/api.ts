import { apiClient } from "@/shared/api/client";


class LoginApi {
  private baseUrl = 'api/auth';

  async login(userData: { username: string; password: string }) {
    return apiClient.post(`${this.baseUrl}/login`, userData);
  }
}

export const loginApi = new LoginApi();
import { apiClient } from "@/shared/api/client";


class RegistrationApi {
  private baseUrl = 'api/auth';

  async registration(userData: { email: string; password: string }) {
    return apiClient.post(`${this.baseUrl}/register`, userData);
  }
}

export const regApi = new RegistrationApi();
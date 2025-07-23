import { apiClient } from "@/shared/api/client";

class GetFavoriteApi {
  private baseUrl = 'api/users';

  async getFavorites(userId: number) {
    return apiClient.get(`${this.baseUrl}/${userId}/favorites`);
  }
}

export const getFavoriteApi = new GetFavoriteApi();
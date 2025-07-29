import { apiClient } from "@/shared/api/client";

class AddFavoriteTrackApi {
  private baseUrl = 'api';

  async addFavoriteSong(userId: number | null, songId: string) {
    return apiClient.post(`${this.baseUrl}/users/${userId}/favorites/song/${songId}`);
  }
}

export const addFavoriteTrackApi = new AddFavoriteTrackApi();
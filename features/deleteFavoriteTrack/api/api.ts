import { apiClient } from "@/shared/api/client";

class DeleteFavoriteTrackApi {
  private baseUrl = 'api';

  async deleteFavoriteSong(userId: number | null, songId: string) {
    return apiClient.delete(`${this.baseUrl}/users/${userId}/favorites/song/${songId}`);
  }
}

export const deleteFavoriteTrackApi = new DeleteFavoriteTrackApi();
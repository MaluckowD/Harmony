import { apiClient } from "@/shared/api/client";

class DeleteFavoriteAlbumApi {
  private baseUrl = 'api';

  async deleteFavoriteAlbum(userId: number | null, albumId: string) {
    return apiClient.delete(`${this.baseUrl}/users/${userId}/favorites/album/${albumId}`);
  }
}

export const deleteFavoriteAlbumApi = new DeleteFavoriteAlbumApi();
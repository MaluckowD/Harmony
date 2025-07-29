import { apiClient } from "@/shared/api/client";

class AddFavoriteAlbumApi {
  private baseUrl = 'api';

  async addFavoriteAlbum(userId: number | null, albumId: string) {
    return apiClient.post(`${this.baseUrl}/users/${userId}/favorites/album/${albumId}`);
  }
}

export const addFavoriteAlbumApi = new AddFavoriteAlbumApi();
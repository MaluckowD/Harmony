import { apiClient } from "@/shared/api/client";

class AlbumApi {
  private baseUrl = 'api';

  async getAlbumById(id: string) {
    return apiClient.get(`${this.baseUrl}/albums/${id}`);
  }
}

export const albumApi = new AlbumApi();
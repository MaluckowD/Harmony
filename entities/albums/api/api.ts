import { apiClient } from "@/shared/api/client";

class AlbumsApi {
  private baseUrl = 'api';

  async getAlbums() {
    return apiClient.get(`${this.baseUrl}/albums`);
  }
}

export const albumsApi = new AlbumsApi();
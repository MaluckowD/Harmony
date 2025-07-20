import { apiClient } from "@/shared/api/client";

class TracksApi {
  private baseUrl = 'api';

  async getTracks() {
    return apiClient.get(`${this.baseUrl}/songs`);
  }
}

export const tracksApi = new TracksApi();
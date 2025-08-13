import { apiClient } from "@/shared/api/client";

class AddTrackApi {
  private baseUrl = 'api';

  async addTrack(formData: FormData) {
    return apiClient.post(`${this.baseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  }
}

export const addTrackApi = new AddTrackApi();
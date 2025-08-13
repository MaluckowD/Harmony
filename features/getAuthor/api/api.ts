import { apiClient } from "@/shared/api/client";

class GetAuthorApi {
  private baseUrl = 'api';

  async getAuthor(id: string) {
    return apiClient.get(`${this.baseUrl}/artists/${id}`);
  }
}

export const getAuthorApi = new GetAuthorApi();
/**
 * Secure API Client
 * Handles all API requests with proper headers and error handling
 */

import { apiConfig } from '../config/apiConfig';

class APIClient {
  /**
   * Make a secure API request
   */
  async request(endpoint, options = {}) {
    if (!apiConfig.isConfigured()) {
      throw new Error('API is not configured. Please configure your API key first.');
    }

    const url = new URL(endpoint, apiConfig.getApiUrl());
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiConfig.getApiKey()}`,
      ...options.headers
    };

    try {
      const response = await fetch(url.toString(), {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API Error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'GET'
    });
  }

  /**
   * POST request
   */
  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PUT request
   */
  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE'
    });
  }
}

export const apiClient = new APIClient();

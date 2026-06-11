/**
 * Secure API Configuration Module
 * Handles secure API key storage and management
 */

class APIConfig {
  constructor() {
    this.apiKey = null;
    this.apiUrl = null;
    this.isInitialized = false;
  }

  /**
   * Initialize API config from environment variables
   * Should be called during app startup
   */
  init() {
    try {
      this.apiKey = import.meta.env.VITE_API_KEY;
      this.apiUrl = import.meta.env.VITE_API_URL || 'https://api.viralflow.com';

      if (!this.apiKey) {
        console.warn('API Key not configured. Please set VITE_API_KEY in .env file');
        return false;
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize API config:', error);
      return false;
    }
  }

  /**
   * Get API Key securely
   * Validates that key exists before returning
   */
  getApiKey() {
    if (!this.isInitialized || !this.apiKey) {
      throw new Error('API Key not configured. Please initialize configuration first.');
    }
    return this.apiKey;
  }

  /**
   * Get API URL
   */
  getApiUrl() {
    return this.apiUrl || 'https://api.viralflow.com';
  }

  /**
   * Check if API is configured
   */
  isConfigured() {
    return this.isInitialized && !!this.apiKey;
  }

  /**
   * Update API key at runtime (from settings)
   * Should validate and store securely
   */
  setApiKey(newKey) {
    if (!newKey || typeof newKey !== 'string') {
      throw new Error('Invalid API key format');
    }
    this.apiKey = newKey;
    // Optionally store in sessionStorage (NOT localStorage for security)
    sessionStorage.setItem('temp_api_key', newKey);
  }

  /**
   * Clear sensitive data
   */
  clear() {
    this.apiKey = null;
    sessionStorage.removeItem('temp_api_key');
    this.isInitialized = false;
  }
}

// Export singleton instance
export const apiConfig = new APIConfig();

import { API_BASE_URL } from '../config/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
    // Check for both possible token keys
    const token = localStorage.getItem('aiva_token') || localStorage.getItem('authToken');

    if (!token) {
        throw new Error('No authentication token found. Please log in again.');
    }

    // Validate token format (should be a non-empty string)
    if (typeof token !== 'string' || token.trim() === '') {
        throw new Error('Invalid authentication token format. Please log in again.');
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

/**
 * Service for email label analysis operations
 */
class EmailLabelAnalysisService {
    /**
     * Analyze user's email labels to generate category suggestions
     * @param {string} userEmail - User's email address
     * @returns {Promise<Object>} Analysis results with labels and descriptions
     */
    async analyzeEmailLabels(userEmail) {
        try {
            const response = await fetch(`${API_BASE_URL}/email/analyze-labels`, {
                method: 'POST',
                headers: getAuthHeaders(),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Email label analysis service error:', error);
            throw error;
        }
    }

    /**
     * Create email triage categories from selected email labels
     * @param {Array<string>} selectedLabels - Array of label names to convert to categories
     * @returns {Promise<Object>} Creation results
     */
    async createCategoriesFromLabels(selectedLabels) {
        try {
            // This will use the new bulk categories endpoint
            // Each label becomes a category with its AI-generated description
            const categories = selectedLabels.map(label => ({
                name: label.label_name,
                description: label.suggested_description
            }));

            const response = await fetch(`${API_BASE_URL}/email/categories/bulk`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    categories: categories
                }),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Category creation service error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const emailLabelAnalysisService = new EmailLabelAnalysisService();

// Export individual functions for convenience
export const { analyzeEmailLabels, createCategoriesFromLabels } = emailLabelAnalysisService;

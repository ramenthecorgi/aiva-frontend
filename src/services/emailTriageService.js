import { API_BASE_URL } from '../config/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
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

// Email Category Management API Functions

/**
 * Get the current user's personalized email categories
 * @param {boolean} activeOnly - If true, only return active categories
 * @returns {Promise<Array>} Array of category objects
 */
export const getUserCategories = async (activeOnly = true) => {
    try {
        const endpoint = activeOnly ? '/email/categories' : '/email/categories/all';
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching user categories:', error);
        throw error;
    }
};

/**
 * Get the system default email categories for reference
 * @returns {Promise<Array>} Array of default category objects
 */
export const getDefaultCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/email/categories/defaults`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching default categories:', error);
        throw error;
    }
};

/**
 * Create a new personalized email category
 * @param {string} name - Category name
 * @param {string} description - Category description
 * @returns {Promise<Object>} Response object with success message
 */
export const createCategory = async (name, description) => {
    try {
        const response = await fetch(`${API_BASE_URL}/email/categories`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                name: name.trim(),
                description: description.trim(),
            }),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

/**
 * Update an existing email category
 * @param {string} name - Category name (cannot be changed)
 * @param {string} description - New description
 * @param {boolean} isActive - Whether the category is active
 * @returns {Promise<Object>} Response object with success message
 */
export const updateCategory = async (name, description, isActive) => {
    try {
        const response = await fetch(`${API_BASE_URL}/email/categories`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                name: name.trim(),
                description: description.trim(),
                is_active: isActive,
            }),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

/**
 * Delete a personalized email category
 * @param {string} name - Category name to delete
 * @returns {Promise<Object>} Response object with success message
 */
export const deleteCategory = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/email/categories`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                name: name.trim(),
                description: '', // Required by API but not used for deletion
                is_active: true, // Required by API but not used for deletion
            }),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

/**
 * Get statistics about the current user's email categories
 * @returns {Promise<Object>} Object with category statistics
 */
export const getCategoryStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/email/categories/stats`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching category stats:', error);
        throw error;
    }
};

/**
 * Bulk update multiple categories (useful for reordering or bulk activation/deactivation)
 * @param {Array} categories - Array of category objects with updated properties
 * @returns {Promise<Array>} Array of update results
 */
export const bulkUpdateCategories = async (categories) => {
    try {
        const updatePromises = categories.map(category =>
            updateCategory(category.name, category.description, category.is_active)
        );
        return await Promise.all(updatePromises);
    } catch (error) {
        console.error('Error bulk updating categories:', error);
        throw error;
    }
};

/**
 * Test the API connection and authentication
 * @returns {Promise<boolean>} True if connection is successful
 */
export const testConnection = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/email/categories`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        return response.ok;
    } catch (error) {
        console.error('API connection test failed:', error);
        return false;
    }
};

// Export all functions
export default {
    getUserCategories,
    getDefaultCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryStats,
    bulkUpdateCategories,
    testConnection,
};

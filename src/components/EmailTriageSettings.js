import React, { useEffect, useState } from 'react';
import {
    createCategory,
    deleteCategory,
    getCategoryStats,
    getDefaultCategories,
    getUserCategories,
    updateCategory
} from '../services/emailTriageService';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';
import Toast from './Toast';

const EmailTriageSettings = () => {
    const [categories, setCategories] = useState([]);
    const [defaultCategories, setDefaultCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [stats, setStats] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    // Load categories on component mount
    useEffect(() => {
        loadCategories();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Load user categories and default categories in parallel
            const [userCategoriesResult, defaultCategoriesResult, statsResult] = await Promise.all([
                getUserCategories(false), // Get all categories (active and inactive)
                getDefaultCategories(),
                getCategoryStats()
            ]);

            setCategories(userCategoriesResult);
            setDefaultCategories(defaultCategoriesResult);
            setStats(statsResult);
        } catch (err) {
            console.error('Error loading categories:', err);
            setError(err.message || 'Failed to load categories. Please try again.');
            showToast('Failed to load categories. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCategory = async (categoryData) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const result = await createCategory(categoryData.name, categoryData.description);

            // Refresh categories to get the updated list
            await loadCategories();

            setShowCreateForm(false);

            // Show success message
            showToast(`Category "${categoryData.name}" created successfully!`);
        } catch (err) {
            console.error('Error creating category:', err);
            const errorMessage = err.message || 'Failed to create category. Please try again.';
            setError(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateCategory = async (oldName, updatedCategory) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const result = await updateCategory(
                updatedCategory.name,
                updatedCategory.description,
                updatedCategory.is_active
            );

            // Refresh categories to get the updated list
            await loadCategories();

            setEditingCategory(null);

            // Show success message
            showToast(`Category "${updatedCategory.name}" updated successfully!`);
        } catch (err) {
            console.error('Error updating category:', err);
            const errorMessage = err.message || 'Failed to update category. Please try again.';
            setError(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCategory = async (categoryName) => {
        if (!window.confirm(`Are you sure you want to delete the category "${categoryName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const result = await deleteCategory(categoryName);

            // Refresh categories to get the updated list
            await loadCategories();

            // Show success message
            showToast(`Category "${categoryName}" deleted successfully!`);
        } catch (err) {
            console.error('Error deleting category:', err);
            const errorMessage = err.message || 'Failed to delete category. Please try again.';
            setError(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleActive = async (categoryName) => {
        try {
            const category = categories.find(cat => cat.name === categoryName);
            if (!category) return;

            const updatedCategory = {
                ...category,
                is_active: !category.is_active
            };

            await updateCategory(
                updatedCategory.name,
                updatedCategory.description,
                updatedCategory.is_active
            );

            // Refresh categories to get the updated list
            await loadCategories();

            // Show success message
            const status = updatedCategory.is_active ? 'activated' : 'deactivated';
            showToast(`Category "${categoryName}" ${status} successfully!`);
        } catch (err) {
            console.error('Error toggling category status:', err);
            const errorMessage = err.message || 'Failed to update category status. Please try again.';
            setError(errorMessage);
            showToast(errorMessage, 'error');
        }
    };

    const handleRetry = () => {
        setError(null);
        loadCategories();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-blue-200">Loading email categories...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                    <div className="text-red-400 text-4xl mb-4">⚠️</div>
                    <h3 className="text-lg font-semibold text-red-200 mb-2">Error Loading Categories</h3>
                    <p className="text-red-100 mb-4">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-200 mb-4">Email Triage Categories</h2>
                    <p className="text-blue-100 text-lg">
                        Manage how your emails are automatically categorized and prioritized
                    </p>
                    {stats && (
                        <div className="mt-4 flex justify-center space-x-6 text-sm text-blue-200">
                            <span>Total: {stats.total_categories}</span>
                            <span>Active: {stats.active_categories}</span>
                            <span>Inactive: {stats.inactive_categories}</span>
                        </div>
                    )}
                </div>

                {/* Create New Category Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowCreateForm(true)}
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>{isSubmitting ? 'Creating...' : 'Create New Category'}</span>
                    </button>
                </div>

                {/* User Categories Section */}
                <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Your Categories ({categories.filter(c => c.is_active).length} active)
                    </h3>

                    {categories.length === 0 ? (
                        <div className="text-center py-8 bg-[rgba(255,255,255,0.05)] rounded-lg border border-white/10">
                            <div className="text-gray-400 text-4xl mb-4">📧</div>
                            <p className="text-blue-200 mb-2">No categories yet</p>
                            <p className="text-blue-100 text-sm">Create your first category to get started with email triage</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.name}
                                    category={category}
                                    onEdit={() => setEditingCategory(category)}
                                    onDelete={() => handleDeleteCategory(category.name)}
                                    onToggleActive={() => handleToggleActive(category.name)}
                                    isEditing={editingCategory?.name === category.name}
                                    disabled={isSubmitting}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Default Categories Section */}
                <div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        System Categories (Reference Only)
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {defaultCategories.map((category) => (
                            <CategoryCard
                                key={category.name}
                                category={category}
                                isSystem={true}
                                readOnly={true}
                            />
                        ))}
                    </div>
                </div>

                {/* Create Category Form Modal */}
                {showCreateForm && (
                    <CategoryForm
                        onSubmit={handleCreateCategory}
                        onCancel={() => setShowCreateForm(false)}
                        mode="create"
                        isSubmitting={isSubmitting}
                    />
                )}

                {/* Edit Category Form Modal */}
                {editingCategory && (
                    <CategoryForm
                        category={editingCategory}
                        onSubmit={(updatedCategory) => handleUpdateCategory(editingCategory.name, updatedCategory)}
                        onCancel={() => setEditingCategory(null)}
                        mode="edit"
                        isSubmitting={isSubmitting}
                    />
                )}
            </div>

            {/* Toast Notifications */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </>
    );
};

export default EmailTriageSettings;

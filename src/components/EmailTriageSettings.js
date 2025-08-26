import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';

const EmailTriageSettings = () => {
    const [categories, setCategories] = useState([]);
    const [defaultCategories, setDefaultCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Mock data for now - will be replaced with actual API calls
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCategories([
                {
                    name: "Trading",
                    description: "Anything related to financial trading, investments, or markets.",
                    is_active: true
                },
                {
                    name: "Vendor",
                    description: "Communications from or about suppliers, service providers, or external companies",
                    is_active: true
                },
                {
                    name: "Family",
                    description: "Spouse, children, extended family communications",
                    is_active: true
                },
                {
                    name: "Home Management",
                    description: "Bills, maintenance, household logistics",
                    is_active: false
                }
            ]);
            setDefaultCategories([
                {
                    name: "Urgent",
                    description: "Items you personally must do or respond to within 24 hours.",
                    is_active: true
                },
                {
                    name: "Decision Needed",
                    description: "Approvals, choices, or unblockers requiring your decision.",
                    is_active: true
                },
                {
                    name: "Clients",
                    description: "Deals, clients, investors, partners, or investment/trading matters.",
                    is_active: true
                }
            ]);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleCreateCategory = (categoryData) => {
        setCategories([...categories, { ...categoryData, is_active: true }]);
        setShowCreateForm(false);
    };

    const handleUpdateCategory = (oldName, updatedCategory) => {
        setCategories(categories.map(cat =>
            cat.name === oldName ? updatedCategory : cat
        ));
        setEditingCategory(null);
    };

    const handleDeleteCategory = (categoryName) => {
        if (window.confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
            setCategories(categories.filter(cat => cat.name !== categoryName));
        }
    };

    const handleToggleActive = (categoryName) => {
        setCategories(categories.map(cat =>
            cat.name === categoryName
                ? { ...cat, is_active: !cat.is_active }
                : cat
        ));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-200">
                <p className="font-medium">Error loading categories:</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-200 mb-4">Email Triage Categories</h2>
                <p className="text-blue-100 text-lg">
                    Manage how your emails are automatically categorized and prioritized
                </p>
            </div>

            {/* Create New Category Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create New Category</span>
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.name}
                            category={category}
                            onEdit={() => setEditingCategory(category)}
                            onDelete={() => handleDeleteCategory(category.name)}
                            onToggleActive={() => handleToggleActive(category.name)}
                            isEditing={editingCategory?.name === category.name}
                        />
                    ))}
                </div>
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
                />
            )}

            {/* Edit Category Form Modal */}
            {editingCategory && (
                <CategoryForm
                    category={editingCategory}
                    onSubmit={(updatedCategory) => handleUpdateCategory(editingCategory.name, updatedCategory)}
                    onCancel={() => setEditingCategory(null)}
                    mode="edit"
                />
            )}
        </div>
    );
};

export default EmailTriageSettings;

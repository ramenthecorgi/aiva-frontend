import React, { useEffect, useState } from 'react';

const CategoryForm = ({ category, onSubmit, onCancel, mode = 'create' }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        is_active: true
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (category && mode === 'edit') {
            setFormData({
                name: category.name,
                description: category.description,
                is_active: category.is_active
            });
        }
    }, [category, mode]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Category name must be at least 2 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Category name must be less than 50 characters';
        }

        if (formData.description.trim().length > 200) {
            newErrors.description = 'Description must be less than 200 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit({
                name: formData.name.trim(),
                description: formData.description.trim(),
                is_active: formData.is_active
            });
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[rgba(10,61,98,0.95)] backdrop-blur-lg rounded-xl border border-white/20 shadow-[0_0_30px_rgba(10,61,98,0.6)] p-6 w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-blue-200">
                        {mode === 'create' ? 'Create New Category' : 'Edit Category'}
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Category Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full px-3 py-2 bg-[rgba(255,255,255,0.1)] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-white/20'
                                }`}
                            placeholder="e.g., Work Projects"
                            disabled={mode === 'edit'} // Name cannot be changed when editing
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                        )}
                        {mode === 'edit' && (
                            <p className="text-gray-400 text-xs mt-1">Category name cannot be changed</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-blue-200 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className={`w-full px-3 py-2 bg-[rgba(255,255,255,0.1)] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.description ? 'border-red-500' : 'border-white/20'
                                }`}
                            placeholder="Describe what emails should be categorized here..."
                        />
                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                        )}
                        <p className="text-gray-400 text-xs mt-1">
                            {formData.description.length}/200 characters
                        </p>
                    </div>

                    {/* Active Status Toggle */}
                    <div className="flex items-center justify-between">
                        <label htmlFor="is_active" className="text-sm font-medium text-blue-200">
                            Active
                        </label>
                        <button
                            type="button"
                            onClick={() => handleInputChange('is_active', !formData.is_active)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${formData.is_active ? 'bg-blue-600' : 'bg-gray-600'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${formData.is_active ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                            {mode === 'create' ? 'Create Category' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;

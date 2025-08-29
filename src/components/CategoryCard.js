import React from 'react';

const CategoryCard = ({
    category,
    onEdit,
    onDelete,
    onToggleActive,
    isEditing = false,
    isSystem = false,
    readOnly = false,
    disabled = false
}) => {
    const { name, description, is_active } = category;

    return (
        <div className={`bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-lg border p-4 transition-all duration-200 hover:shadow-lg max-h-64 overflow-hidden ${is_active
            ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
            : 'border-gray-500/30 opacity-60'
            } ${isSystem ? 'border-purple-500/30' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                    {/* Status Indicator */}
                    <div className={`w-3 h-3 rounded-full ${isSystem
                        ? 'bg-purple-500'
                        : is_active
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        }`} />

                    {/* Category Name */}
                    <h4 className={`font-semibold text-lg ${isSystem ? 'text-purple-200' : 'text-blue-200'
                        }`}>
                        {name}
                    </h4>

                    {/* System Badge */}
                    {isSystem && (
                        <span className="px-2 py-1 text-xs bg-purple-600/30 text-purple-200 rounded-full border border-purple-500/30">
                            System
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                {!readOnly && (
                    <div className="flex items-center space-x-2">
                        {/* Toggle Active Button */}
                        <button
                            onClick={onToggleActive}
                            disabled={disabled}
                            className={`p-1.5 rounded-md transition-colors duration-200 ${is_active
                                ? 'text-green-400 hover:bg-green-500/20'
                                : 'text-gray-400 hover:bg-gray-500/20'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={is_active ? 'Deactivate category' : 'Activate category'}
                        >
                            {is_active ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>

                        {/* Edit Button */}
                        <button
                            onClick={onEdit}
                            disabled={disabled}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit category"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.586a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={onDelete}
                            disabled={disabled}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete category"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="flex-1 min-h-0">
                <p className={`text-sm leading-relaxed overflow-y-auto max-h-20 ${isSystem ? 'text-purple-100' : 'text-blue-100'
                    }`}>
                    {description}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                    {/* Status Text */}
                    <span className={`${isSystem
                        ? 'text-purple-300'
                        : is_active
                            ? 'text-green-300'
                            : 'text-gray-400'
                        }`}>
                        {isSystem
                            ? 'System Category'
                            : is_active
                                ? 'Active'
                                : 'Inactive'
                        }
                    </span>

                    {/* Character Count */}
                    <span className="text-gray-400">
                        {description.length} chars
                    </span>
                </div>
            </div>

            {/* Editing Indicator */}
            {isEditing && (
                <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500/50 rounded-lg flex items-center justify-center">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Editing...
                    </div>
                </div>
            )}

            {/* Disabled Overlay */}
            {disabled && (
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Processing...
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryCard;

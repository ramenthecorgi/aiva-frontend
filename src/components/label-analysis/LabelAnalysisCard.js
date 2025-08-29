import React, { useState } from 'react';

const LabelAnalysisCard = ({
    label,
    isSelected,
    onSelectionChange,
    onPreviewEmails,
    onDescriptionEdit
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(label.suggested_description);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Unknown date';
        }
    };

    const handleDescriptionSave = () => {
        if (onDescriptionEdit) {
            onDescriptionEdit(label.label_name, editedDescription);
        }
        setIsEditing(false);
    };

    const handleDescriptionCancel = () => {
        setEditedDescription(label.suggested_description);
        setIsEditing(false);
    };

    return (
        <div className={`bg-[rgba(10,61,98,0.4)] rounded-xl border transition-all duration-200 max-h-96 ${isSelected
            ? 'border-blue-400 shadow-lg shadow-blue-400/20'
            : 'border-white/10 hover:border-white/20'
            }`}>
            <div className="p-4 sm:p-6 h-full">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 h-full">
                    {/* Left Section - Header and Selection - Made Narrower */}
                    <div className="flex-shrink-0 min-w-0 w-48">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-blue-200 mb-2">
                                    {label.label_name}
                                </h3>
                                <div className="flex flex-col text-sm text-blue-100 space-y-1">
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        {label.email_count} emails
                                    </span>
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Latest: {formatDate(label.latest_email_date)}
                                    </span>
                                    <button
                                        onClick={() => onPreviewEmails(label)}
                                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-2 transition-colors py-2 px-3 rounded-lg hover:bg-[rgba(255,255,255,0.05)] border border-blue-400/30 w-fit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>Preview emails ({label.sample_emails.length})</span>
                                    </button>
                                </div>
                            </div>

                            {/* Selection Checkbox */}
                            <div className="ml-3 sm:ml-4 flex-shrink-0">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => onSelectionChange(label.label_name, e.target.checked)}
                                    className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Description - Made Wider */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-blue-300">AI-Generated Description</h4>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-blue-400 hover:text-blue-300 text-xs underline"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="space-y-3">
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    className="w-full h-24 p-3 bg-[rgba(255,255,255,0.05)] border border-white/20 rounded-lg text-blue-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter description..."
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleDescriptionSave}
                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleDescriptionCancel}
                                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="max-h-32 overflow-y-auto pr-2">
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    {label.suggested_description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex-shrink-0">
                        {/* Preview Emails button moved to left section */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabelAnalysisCard;

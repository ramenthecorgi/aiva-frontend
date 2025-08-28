import React from 'react';

const LabelAnalysisCard = ({ 
    label, 
    isSelected, 
    onSelectionChange, 
    onPreviewEmails 
}) => {
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

    const truncateDescription = (description, maxLength = 150) => {
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    };

    return (
        <div className={`bg-[rgba(10,61,98,0.4)] rounded-xl border transition-all duration-200 ${
            isSelected 
                ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                : 'border-white/10 hover:border-white/20'
        }`}>
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-200 mb-1">
                            {label.label_name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-blue-100">
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                {label.email_count} emails
                            </span>
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Latest: {formatDate(label.latest_email_date)}
                            </span>
                        </div>
                    </div>
                    
                    {/* Selection Checkbox */}
                    <div className="ml-4">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => onSelectionChange(label.label_name, e.target.checked)}
                            className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="p-6">
                <h4 className="text-sm font-medium text-blue-300 mb-2">AI-Generated Description</h4>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                    {truncateDescription(label.suggested_description)}
                </p>
                
                {label.suggested_description.length > 150 && (
                    <button
                        onClick={() => onPreviewEmails(label)}
                        className="text-blue-400 hover:text-blue-300 text-sm underline"
                    >
                        View full description
                    </button>
                )}
            </div>

            {/* Actions */}
            <div className="px-6 pb-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => onPreviewEmails(label)}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Preview emails ({label.sample_emails.length})</span>
                    </button>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isSelected 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-600 text-gray-300'
                    }`}>
                        {isSelected ? 'Selected' : 'Not selected'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabelAnalysisCard;

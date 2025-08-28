import React from 'react';

const EmailPreviewModal = ({ label, onClose }) => {
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Unknown date';
        }
    };

    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[rgba(10,61,98,0.95)] rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-blue-200 mb-2">
                                {label.label_name}
                            </h2>
                            <div className="flex items-center space-x-4 text-blue-100">
                                <span>{label.email_count} emails</span>
                                <span>•</span>
                                <span>Latest: {formatDate(label.latest_email_date)}</span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* AI Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-blue-200 mb-3">
                            AI-Generated Description
                        </h3>
                        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 border border-white/10">
                            <p className="text-blue-100 leading-relaxed">
                                {label.suggested_description}
                            </p>
                        </div>
                    </div>

                    {/* Sample Emails */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-200 mb-4">
                            Sample Emails ({label.sample_emails.length})
                        </h3>
                        
                        <div className="space-y-4">
                            {label.sample_emails.map((email, index) => (
                                <div 
                                    key={index}
                                    className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 border border-white/10"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-blue-200 mb-1">
                                                {email.subject || 'No Subject'}
                                            </h4>
                                            <p className="text-blue-100 text-sm mb-2">
                                                From: <span className="font-medium">{email.sender}</span>
                                            </p>
                                        </div>
                                        <span className="text-blue-100 text-sm">
                                            {formatDate(email.date)}
                                        </span>
                                    </div>
                                    
                                    <div className="text-blue-100 text-sm">
                                        <p className="leading-relaxed">
                                            {truncateText(email.snippet, 200)}
                                        </p>
                                        {email.snippet.length > 200 && (
                                            <button className="text-blue-400 hover:text-blue-300 text-sm mt-2 underline">
                                                View full content
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-[rgba(0,0,0,0.2)]">
                    <div className="flex items-center justify-between">
                        <p className="text-blue-100 text-sm">
                            These sample emails help the AI understand what this label contains
                        </p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                            Close Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailPreviewModal;

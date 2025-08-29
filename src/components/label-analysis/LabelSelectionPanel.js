import React from 'react';

const LabelSelectionPanel = ({
    selectedLabels,
    totalLabels,
    onBulkSelection,
    onApplyCategories
}) => {
    const selectedCount = selectedLabels.size;
    const isAllSelected = selectedCount === totalLabels;

    return (
        <div className="bg-[rgba(10,61,98,0.4)] rounded-2xl border border-white/10 p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    {/* Bulk Selection Controls */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => onBulkSelection(true)}
                            disabled={isAllSelected}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAllSelected
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            Select All
                        </button>

                        <button
                            onClick={() => onBulkSelection(false)}
                            disabled={selectedCount === 0}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCount === 0
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Selection Status */}
                    <div className="text-blue-100 text-sm">
                        <span className="font-medium">{selectedCount}</span> of <span className="font-medium">{totalLabels}</span> labels selected
                    </div>
                </div>

                {/* Apply Categories Button */}
                <div className="flex items-center space-x-3">
                    {selectedCount > 0 && (
                        <div className="text-right">
                            <p className="text-blue-200 text-sm font-medium">
                                Ready to create {selectedCount} email triage {selectedCount === 1 ? 'category' : 'categories'}
                            </p>
                            <p className="text-blue-100 text-xs">
                                Each selected label will become a new category with its AI-generated description
                            </p>
                        </div>
                    )}

                    <button
                        onClick={onApplyCategories}
                        disabled={selectedCount === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${selectedCount === 0
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                            {selectedCount === 0
                                ? 'Select Labels First'
                                : `Create ${selectedCount} Categor${selectedCount === 1 ? 'y' : 'ies'}`
                            }
                        </span>
                    </button>
                </div>
            </div>


        </div>
    );
};

export default LabelSelectionPanel;

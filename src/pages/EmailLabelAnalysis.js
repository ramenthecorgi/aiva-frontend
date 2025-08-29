import React, { useState } from 'react';
import EmailPreviewModal from '../components/label-analysis/EmailPreviewModal';
import LabelAnalysisList from '../components/label-analysis/LabelAnalysisList';
import LabelSelectionPanel from '../components/label-analysis/LabelSelectionPanel';
import Toast from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';
import { analyzeEmailLabels, createCategoriesFromLabels } from '../services/emailLabelAnalysisService';

const EmailLabelAnalysis = () => {
    const { user } = useAuth();
    const [analysisState, setAnalysisState] = useState({
        isAnalyzing: false,
        emailLabels: [],
        selectedLabels: new Set(),
        analysisProgress: 0,
        error: null
    });
    const [previewLabel, setPreviewLabel] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    const handleAnalyzeLabels = async () => {
        if (!user?.email) {
            showToast('Please log in to analyze your email labels', 'error');
            return;
        }

        try {
            setAnalysisState(prev => ({ ...prev, isAnalyzing: true, error: null }));

            const result = await analyzeEmailLabels(user.email);

            if (result.labels && result.labels.length > 0) {
                setAnalysisState(prev => ({
                    ...prev,
                    emailLabels: result.labels,
                    isAnalyzing: false
                }));
                showToast(`Found ${result.labels.length} qualifying email labels for analysis`);
            } else {
                setAnalysisState(prev => ({
                    ...prev,
                    emailLabels: [],
                    isAnalyzing: false
                }));
                showToast(result.message || 'No qualifying labels found', 'info');
            }
        } catch (error) {
            console.error('Error analyzing email labels:', error);
            setAnalysisState(prev => ({
                ...prev,
                isAnalyzing: false,
                error: error.message || 'Failed to analyze email labels'
            }));
            showToast('Failed to analyze email labels. Please try again.', 'error');
        }
    };

    const handleLabelSelection = (labelName, isSelected) => {
        setAnalysisState(prev => {
            const newSelectedLabels = new Set(prev.selectedLabels);
            if (isSelected) {
                newSelectedLabels.add(labelName);
            } else {
                newSelectedLabels.delete(labelName);
            }
            return { ...prev, selectedLabels: newSelectedLabels };
        });
    };

    const handleBulkSelection = (isSelectAll) => {
        setAnalysisState(prev => {
            if (isSelectAll) {
                const allLabels = new Set(prev.emailLabels.map(label => label.label_name));
                return { ...prev, selectedLabels: allLabels };
            } else {
                return { ...prev, selectedLabels: new Set() };
            }
        });
    };

    const handlePreviewEmails = (label) => {
        setPreviewLabel(label);
    };

    const closePreview = () => {
        setPreviewLabel(null);
    };

    const handleDescriptionEdit = (labelName, newDescription) => {
        setAnalysisState(prev => ({
            ...prev,
            emailLabels: prev.emailLabels.map(label =>
                label.label_name === labelName
                    ? { ...label, suggested_description: newDescription }
                    : label
            )
        }));
        showToast(`Description updated for "${labelName}"`, 'success');
    };

    const handleApplyCategories = async () => {
        if (analysisState.selectedLabels.size === 0) {
            showToast('Please select at least one label to add as a category', 'warning');
            return;
        }

        try {
            // Get the full label objects for selected labels
            const selectedLabelsArray = Array.from(analysisState.selectedLabels);
            const selectedLabelObjects = analysisState.emailLabels.filter(label =>
                selectedLabelsArray.includes(label.label_name)
            );

            // Create categories using the service layer
            const result = await createCategoriesFromLabels(selectedLabelObjects);

            // Show success message with details
            showToast(`Successfully created ${selectedLabelObjects.length} email triage categories!`);

            // Clear selection after successful creation
            setAnalysisState(prev => ({ ...prev, selectedLabels: new Set() }));

        } catch (error) {
            console.error('Error applying categories:', error);

            // Provide more specific error messages
            if (error.message.includes('already exists')) {
                showToast('Some categories already exist. Please check your existing categories.', 'warning');
            } else if (error.message.includes('authentication')) {
                showToast('Authentication failed. Please log in again.', 'error');
            } else {
                showToast(`Failed to create categories: ${error.message}`, 'error');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-blue-200 mb-4">
                    Email Label Analysis
                </h1>
                <p className="text-blue-100 text-lg">
                    Analyze your email labels to automatically create email triage categories
                </p>
            </div>

            {/* Analysis Controls */}
            <div className="bg-[rgba(10,61,98,0.4)] rounded-2xl border border-white/10 p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-blue-200 mb-2">
                            Start Analysis
                        </h2>
                        <p className="text-blue-100 text-sm">
                            Find most actively used email labels
                        </p>
                    </div>

                    <button
                        onClick={handleAnalyzeLabels}
                        disabled={analysisState.isAnalyzing}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        {analysisState.isAnalyzing ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>Analyze Email Labels</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {analysisState.error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                    <div className="text-red-400 text-lg mb-2">⚠️ Analysis Error</div>
                    <p className="text-red-100">{analysisState.error}</p>
                    <button
                        onClick={() => setAnalysisState(prev => ({ ...prev, error: null }))}
                        className="mt-3 text-red-300 hover:text-red-200 underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Results Section */}
            {analysisState.emailLabels.length > 0 && (
                <div className="space-y-6">
                    {/* Selection Panel */}
                    <LabelSelectionPanel
                        selectedLabels={analysisState.selectedLabels}
                        totalLabels={analysisState.emailLabels.length}
                        onBulkSelection={handleBulkSelection}
                        onApplyCategories={handleApplyCategories}
                    />

                    {/* Labels List */}
                    <LabelAnalysisList
                        labels={analysisState.emailLabels}
                        selectedLabels={analysisState.selectedLabels}
                        onLabelSelection={handleLabelSelection}
                        onPreviewEmails={handlePreviewEmails}
                        onDescriptionEdit={handleDescriptionEdit}
                    />
                </div>
            )}

            {/* No Results Message */}
            {!analysisState.isAnalyzing && analysisState.emailLabels.length === 0 && !analysisState.error && (
                <div className="text-center py-12 bg-[rgba(255,255,255,0.05)] rounded-lg border border-white/10">
                    <div className="text-gray-400 text-4xl mb-4">📧</div>
                    <p className="text-blue-200 mb-2">Ready to analyze your email labels</p>
                    <p className="text-blue-100 text-sm">
                        Click "Analyze Email Labels" to discover labels that can become email triage categories
                    </p>
                </div>
            )}

            {/* Email Preview Modal */}
            {previewLabel && (
                <EmailPreviewModal
                    label={previewLabel}
                    onClose={closePreview}
                />
            )}

            {/* Toast Notifications */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </div>
    );
};

export default EmailLabelAnalysis;

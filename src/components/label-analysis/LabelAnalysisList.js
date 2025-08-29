import React from 'react';
import LabelAnalysisCard from './LabelAnalysisCard';

const LabelAnalysisList = ({
    labels,
    selectedLabels,
    onLabelSelection,
    onPreviewEmails,
    onDescriptionEdit
}) => {
    if (!labels || labels.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-blue-100">No labels to display</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-200 mb-2">
                    Analyzed Labels ({labels.length})
                </h3>
                <p className="text-blue-100 text-sm">
                    Review the AI-generated descriptions and select which labels to add as email triage categories
                </p>
            </div>

            <div className="space-y-4">
                {labels.map((label) => (
                    <LabelAnalysisCard
                        key={label.label_id}
                        label={label}
                        isSelected={selectedLabels.has(label.label_name)}
                        onSelectionChange={onLabelSelection}
                        onPreviewEmails={onPreviewEmails}
                        onDescriptionEdit={onDescriptionEdit}
                    />
                ))}
            </div>

            {labels.length > 0 && (
                <div className="mt-8 text-center">
                    <p className="text-blue-100 text-sm">
                        💡 <strong>Tip:</strong> Select the labels that best represent your email organization patterns.
                        Each selected label will become an email triage category.
                    </p>
                </div>
            )}
        </div>
    );
};

export default LabelAnalysisList;

import { useState } from 'react';
import { validateReport } from '../utils/dataHandler';

export function ReportValidationModal({ report, onClose, onReportUpdated }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!report) return null;

    const handleValidation = async (status) => {
        setIsSubmitting(true);
        try {
            const updatedReport = await validateReport(report.id, status);
            
            // Notify parent component about the update
            if (onReportUpdated) {
                onReportUpdated(updatedReport);
            }
            
            alert(`Report ${status} successfully!`);
            onClose();
            
        } catch (error) {
            alert(`Failed to ${status === 'validated' ? 'validate' : 'reject'} report. Please try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-md mx-2">
                <h3 className="text-lg font-bold mb-4 text-center">
                    Validate Report?
                </h3>
                <div className="mb-4 text-sm">
                    <div className="mb-2">
                        <span className="font-semibold">ID:</span> {report.id}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'validated' ? 'bg-green-100 text-green-800' :
                            report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {report.status || 'pending'}
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Lat:</span> {report.latitude}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Lon:</span> {report.longitude}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Email:</span> {report.email}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Category:</span> {report.category}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Description:</span> 
                        <div className="mt-1 max-h-20 overflow-y-auto text-gray-700">
                            {report.description}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        onClick={() => handleValidation('validated')}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Validate'}
                    </button>
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                        onClick={() => handleValidation('rejected')}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Deny'}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
}
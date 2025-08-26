import { useState } from 'react';

export function ViewImagesModal({ report, onClose }) {
    const [fullScreenImage, setFullScreenImage] = useState(null);
    
    if (!report) return null;

    const getImageUrl = (imageUrl) => {
        // If it's already a full URL (starts with http/https), use it as-is
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }
        // Otherwise, it's a local file path, prepend server URL
        return `http://localhost:5000${imageUrl}`;
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-4xl mx-2 max-h-[80vh] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4 text-center">
                        Images for Report #{report.id}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {report.images && report.images.length > 0 ? (
                            report.images.map((img, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div 
                                        className="w-full h-48 border rounded shadow-sm cursor-pointer hover:shadow-lg transition-shadow overflow-hidden bg-gray-100"
                                        onClick={() => setFullScreenImage(getImageUrl(img.image_url))}
                                    >
                                        <img
                                            src={getImageUrl(img.image_url)}
                                            alt={`Report ${report.id} image ${idx + 1}`}
                                            className="w-full h-full object-contain hover:object-cover transition-all duration-200"
                                            onError={(e) => {
                                                console.error('Failed to load image:', e.target.src);
                                            }}
                                        />
                                    </div>
                                    {img.original_filename && (
                                        <span className="text-xs text-gray-500 mt-1 text-center truncate w-full">
                                            {img.original_filename}
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <span className="text-gray-500">No images submitted.</span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 w-full"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Full Screen Image Modal */}
            {fullScreenImage && (
                <div 
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90"
                    onClick={() => setFullScreenImage(null)}
                >
                    <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
                        <img
                            src={fullScreenImage}
                            alt="Full screen view"
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
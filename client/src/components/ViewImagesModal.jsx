export function ViewImagesModal({ report, onClose }) {
    if (!report) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-md mx-2">
                <h3 className="text-lg font-bold mb-4 text-center">
                    Images for Report #{report.id}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {report.images && report.images.length > 0 ? (
                        report.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Report ${report.id} img ${idx + 1}`}
                                className="w-32 h-20 object-cover border rounded"
                            />
                        ))
                    ) : (
                        <span className="text-gray-500">No images submitted.</span>
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
    );
}
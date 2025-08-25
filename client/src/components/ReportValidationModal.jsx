export function ReportValidationModal({ report, onClose }) {
    if (!report) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-md mx-2">
                <h3 className="text-lg font-bold mb-4 text-center">
                    Validate Report?
                </h3>
                <div className="mb-4 text-sm">
                    <div>
                        <span className="font-semibold">ID:</span> {report.id}
                    </div>
                    <div>
                        <span className="font-semibold">Lat:</span> {report.lat}
                    </div>
                    <div>
                        <span className="font-semibold">Lon:</span> {report.lon}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {report.email}
                    </div>
                    <div>
                        <span className="font-semibold">Category:</span> {report.category}
                    </div>
                    <div>
                        <span className="font-semibold">Description:</span> {report.description}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Validate
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Deny
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useState } from "react";

export function ReportList() {
    const [validateReportModal, setValidateReportModal] = useState(null);

    /*
    NOTE: This is placeholder data before backend will be implemented.
    */
    const reports = [
        {
            id: 1,
            lat: 18.48,
            lon: -66.43,
            email: "johnsmith@gmail.com",
            category: "Pollution",
            description: "Saw pickup trucks dump trash on the coast.",
        },
        {
            id: 2,
            lat: 18.47,
            lon: -66.25,
            email: "johnsmith@gmail.com",
            category: "Blocked Access",
            description: "Government signs negating access to the area.",
        },
    ];

    return (
        <>
            <h2 className="text-xl font-bold m-2 bg-gray-50 text-center">
                User Reports
            </h2>
            <div className="flex justify-center items-start">
                <div className="overflow-x-scroll w-full max-w-4xl">
                    <table>
                        <thead>
                            <tr className="bg-gray-100">
                                <th>ID</th>
                                <th>Lat</th>
                                <th>Long</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-t bg-gray-50">
                                    <td>{report.id}</td>
                                    <td>{report.lat}</td>
                                    <td>{report.lon}</td>
                                    <td>{report.email}</td>
                                    <td>{report.category}</td>
                                    <td>{report.description}</td>
                                    <td>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => setValidateReportModal(report)}
                                        >
                                            Validate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {validateReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-md mx-2">
                        <h3 className="text-lg font-bold mb-4 text-center">
                            Validate Report?
                        </h3>
                        <div className="mb-4 text-sm">
                            <div>
                                <span className="font-semibold">ID:</span> {validateReportModal.id}
                            </div>
                            <div>
                                <span className="font-semibold">Lat:</span> {validateReportModal.lat}
                            </div>
                            <div>
                                <span className="font-semibold">Lon:</span> {validateReportModal.lon}
                            </div>
                            <div>
                                <span className="font-semibold">Email:</span> {validateReportModal.email}
                            </div>
                            <div>
                                <span className="font-semibold">Category:</span> {validateReportModal.category}
                            </div>
                            <div>
                                <span className="font-semibold">Description:</span> {validateReportModal.description}
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
                                onClick={() => setValidateReportModal(null)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}